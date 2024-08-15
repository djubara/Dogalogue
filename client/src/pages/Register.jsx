import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
    <h2>User Information</h2>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} md="6" className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      </Row>
      <h2>Pet Information</h2>
      <Row className="mb-6">
      <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Pet name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Pet name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Pet Size</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>XL</option>
            <option>Large</option>
            <option>Medium</option>
            <option>Small</option>
            <option>xs</option>
          </Form.Select>
        </Form.Group>
    </Row>
    <Row className="mb-6">
      <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Pet age</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Pet age"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Pet breed</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="Pet breed"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Pet Gender</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Male</option>
            <option>Female</option>
          </Form.Select>
        </Form.Group>
        </Row>
        <Row className="mb-6">
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label >Pet's Gotcha Date!</Form.Label>
          <Form.Control
            required
            type="date"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Is your pet altered?</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Yes</option>
            <option>No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Pet's Energy Level</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>
    </Row>
    <Form.Group>
        <Form.Label>Upload a photo!</Form.Label>
        <Form.Control type="file" />
    </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
    </>
  );
}

export default Register;

   