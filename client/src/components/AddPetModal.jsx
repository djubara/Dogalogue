import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_PET } from "../utils/mutations";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { uploadImage } from "../utils/images";
import { QUERY_ME } from "../utils/queries";
import ImageUpload from "./ImageUpload";

export default function AddPetModal({ show, setShow }) {
  const [error, setError] = useState(undefined);

  const [photoUrl, setPhotoUrl] = useState("");

  const { loading, error: queryError, data } = useQuery(QUERY_ME);

  const [createPet, { createPetError }] = useMutation(CREATE_PET);

  function handleFormInputChange(event) {
    // create non-ref copy
    let tempObj = JSON.parse(JSON.stringify(formData));
    tempObj[event.target.name] = event.target.value;
    setFormData(tempObj);
    console.log(tempObj);
  }

  const [formData, setFormData] = useState({
    petName: "Jack",
    size: "lg",
    age: 16,
    breed: "Black Lab",
    gender: "male",
    gotchaDate: "2007-01-01",
    altered: true,
    energyLevel: 3,
    photoUrl: undefined,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(userProfile);

    const res = await createPet({
      variables: {
        pet: {
          ...formData,
          age: parseInt(formData.age),
          energyLevel: parseInt(formData.energyLevel),
          photoUrl,
        },
      },
    });

    console.log(res);

    window.location.reload();
  }

  if (!data || loading) {
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
            <Modal.Title id="example-modal-sizes-title-lg">Add Pet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {/* pet name */}
              <Form.Group>
                <Form.Label>Pet name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="petName"
                  placeholder="Pet name"
                  value={formData.petName}
                  onChange={handleFormInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Pet Size</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  name="size"
                  type="text"
                  value={formData.size}
                  onChange={handleFormInputChange}
                >
                  <option>Choose...</option>
                  <option>xl</option>
                  <option>lg</option>
                  <option>md</option>
                  <option>sm</option>
                  <option>xs</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Pet age</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="age"
                  placeholder="Pet age"
                  value={formData.age}
                  onChange={handleFormInputChange}
                />
                <Form.Control.Feedback></Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Pet breed</Form.Label>

                <Form.Control
                  required
                  type="text"
                  name="breed"
                  placeholder="Pet breed"
                  value={formData.breed}
                  onChange={handleFormInputChange}
                />
                <Form.Control.Feedback></Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Pet Gender</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  name="gender"
                  type="text"
                  value={formData.gender}
                  onChange={handleFormInputChange}
                >
                  <option>Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Pet's Gotcha Date!</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="gotchaDate"
                  value={formData.gotchaDate}
                  onChange={handleFormInputChange}
                />
                <Form.Control.Feedback></Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Is your pet spayed/neutered?</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  name="altered"
                  type="boolean"
                  value={formData.altered}
                  onChange={handleFormInputChange}
                >
                  <option>Choose...</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Pet's Energy Level: {formData.energyLevel}
                </Form.Label>
                <Form.Range
                  name="energyLevel"
                  type="range"
                  min={0}
                  max={5}
                  value={formData.energyLevel}
                  onChange={handleFormInputChange}
                ></Form.Range>
              </Form.Group>

              <ImageUpload imageUrl={photoUrl} setImageUrl={setPhotoUrl} />

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
