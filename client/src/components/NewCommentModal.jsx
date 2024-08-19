import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_COMMENT } from "../utils/mutations";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { QUERY_ME } from "../utils/queries";

export default function NewCommentModal({ post, postId, show, setShow }) {
  const [error, setError] = useState(undefined);

  const { loading, error: queryError, data } = useQuery(QUERY_ME);

  const [createComment, { createCommentError }] = useMutation(CREATE_COMMENT);

  const [formData, setFormData] = useState({
    postingAs: "me",
    content: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const res = await createComment({
      variables: {
        postId,
        comment: formData,
      },
    });

    if (res?.data?.createComment) {
      // TODO update post
      post = res.data.createComment;
    }

    setShow(false);
    // window.location.reload();
  }

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            New Comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Post as</Form.Label>
              <Form.Control
                as="select"
                value={formData.postingAs}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    postingAs: event.target.value,
                  })
                }
              >
                <option value="me">Yourself (Cole)</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  data.me.pets.map((pet) => (
                    <option value={pet.id} key={pet.id}>
                      {pet.petName}
                    </option>
                  ))
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    content: event.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* error modal */}
      <Modal show={error} centered>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {error ? error.message : "An error occured. Please try again!"}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setError(undefined)}>Whoops!</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
