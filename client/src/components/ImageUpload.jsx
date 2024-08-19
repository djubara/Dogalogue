import { useState } from "react";
import { uploadImage } from "../utils/images";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ImageUpload({ imageUrl, setImageUrl }) {
  const [error, setError] = useState(undefined);
  const [uploading, setUploading] = useState(false);

  async function handleChange(event) {
    if (event.target.files[0]) {
      try {
        setUploading(true);
        const imageUrl = await uploadImage(event.target.files[0]);
        setImageUrl(imageUrl);
        setUploading(false);
      } catch (error) {
        setUploading(false);
        console.error(error);
        setError(
          new Error(
            "An error occured while uploading your image: " + error.message
          )
        );
      }
    }
  }

  return (
    <>
      <Form.Group controlId="exampleForm.ControlFile1" className="mb-3">
        <Form.Label>Upload a Photo</Form.Label>
        <Form.Control
          type="file"
          accept="image/jpeg"
          capture="environment"
          multiple={false}
          onChange={handleChange}
        />
      </Form.Group>

      {/* uploading modal */}
      <Modal show={uploading}>
        <Modal.Header>
          <Modal.Title>Uploading Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <img
            src="https://i.pinimg.com/originals/00/94/18/009418460183d05cbbff41179436b3eb.gif"
            alt="loading gears"
          />
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
