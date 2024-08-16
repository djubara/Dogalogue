import FeedPosts from "../components/FeedPosts";
import FeedPostInput from "../components/FeedPostInput";
import Auth from "../utils/auth";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { uploadImage } from "../utils/images";

const DogFeed = () => {
  const [uploadingImage, setUploadingImage] = useState(false);

  const [imageInputFile, setImageInputFile] = useState(undefined);

  const [createPost, { error }] = useMutation(CREATE_POST);
  const [showNewPostModal, setShowNewPostModal] = useState(true);
  const [newPostFormData, setNewPostFormData] = useState({
    postingAs: "me",
    content: "",
    photoUrl: undefined,
  });

  async function handleNewPostSubmit(event) {
    event.preventDefault();
    // console.log(userProfile);

    setUploadingImage(true);
    const photoUrl = await uploadImage(imageInputFile);
    setUploadingImage(false);

    const createdPost = await createPost({
      variables: {
        post: {
          ...newPostFormData,
          photoUrl,
        },
      },
    });

    console.log("Created post successfully!");
    console.log(createdPost);
  }

  return (
    <>
      <div className="feedPage full-withradius border">
        {Auth.loggedIn() ? (
          <>
            <header className="d-flex w-100 justify-content-between">
              <h1 className="feed-title">Posts</h1>
              <Button onClick={() => setShowNewPostModal(true)}>
                New Post
              </Button>
            </header>

            <FeedPosts />
          </>
        ) : (
          <h2>You need to be logged in to see the feed.</h2>
        )}
      </div>

      {/* new post modal */}
      <Modal
        size="lg"
        show={showNewPostModal}
        onHide={() => setShowNewPostModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewPostSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Post as</Form.Label>
              <Form.Control
                as="select"
                value={newPostFormData.postingAs}
                onChange={(event) =>
                  setNewPostFormData({
                    ...newPostFormData,
                    posttingAs: event.target.value,
                  })
                }
              >
                <option value="me">Yourself (Cole)</option>
                <option value="jack">Jack</option>
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
                  setNewPostFormData({
                    ...newPostFormData,
                    content: event.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlFile1" className="mb-3">
              <Form.Label>Include a Photo!</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg"
                capture="environment"
                multiple={false}
                onChange={(event) => setImageInputFile(event.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* photo upload modal */}
      <Modal show={uploadingImage}>
        <Modal.Header>
          <Modal.Title>Uploading Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <img
            src="https://i.pinimg.com/originals/00/94/18/009418460183d05cbbff41179436b3eb.gif"
            alt=""
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DogFeed;
