import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_POST } from "../utils/mutations";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uploadImage } from "../utils/images";
import auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import ImageUpload from "./ImageUpload";

export default function NewPostModal({ show, setShow }) {
  const [error, setError] = useState(undefined);

  const { loading, error: queryError, data } = useQuery(QUERY_ME);

  const [imageUrl, setImageUrl] = useState("");

  const [createPost, { createPostError }] = useMutation(CREATE_POST);

  const [formData, setFormData] = useState({
    postingAs: "me",
    content: "",
    photoUrl: undefined,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(userProfile);

    const createdPost = await createPost({
      variables: {
        post: {
          ...formData,
          photoUrl: imageUrl,
        },
      },
    });

    window.location.reload();
  }

  if (!data) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  } else {
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
              New Post
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
                  <option value="me">Yourself ({data.me.firstName})</option>
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

              <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />

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
}
