import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';


function Register() {
  const [validated, setValidated] = useState(false);
  
  const [userFormData, setUserFormData] = useState({ email: '', password: '', firstName: '', lastName: ''});
  const [petFormData, setPetFormData] = useState({ petName: '', size: '', age: 0, breed: '', energyLevel: 1, photoUrl: '', altered: false, gotchaDate: '', gender: 'male'});
  const [register, { error }] = useMutation(ADD_USER);
  const handleSubmit = async (event) => {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    // }

    try {
      console.log(userFormData);
      console.log(petFormData);
      const { data } = await register({
        variables: { user: userFormData, pet: petFormData },
      });
      console.log(data);
      Auth.login(data.register.token);
    } catch (e) {
      console.error(e);
      console.log(error);
    }
    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === 'email' || inputType === 'password' || inputType === 'firstName' || inputType === 'lastName') {
      setUserFormData({ ...userFormData, [inputType]: inputValue });
    } else if (inputType === 'altered') {
      setPetFormData({ ...petFormData, [inputType]: Boolean(inputValue) });
    } else if (inputType === 'age' || inputType === 'energyLevel')  {
      setPetFormData({ ...petFormData, [inputType]: parseInt(inputValue) });
    } else if (inputType === 'gotchaDate') {
      // setPetFormData({ ...petFormData, [inputType]: new Date(inputValue).toLocaleDateString("en-us") });
      setPetFormData({ ...petFormData, [inputType]: inputValue });
    } else {
      setPetFormData({ ...petFormData, [inputType]: inputValue });
    }
    console.log(userFormData);
    console.log(petFormData);
  }

  return (
    <>
    <h2>User Information</h2>
    <Form validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="firstName"
            value={userFormData.firstName}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            placeholder="Last name"
            value={userFormData.lastName}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        required 
        type="email" 
        placeholder="Enter email" 
        name="email"
        value={userFormData.email} 
        onChange={handleInputChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group as={Col} md="6" className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        required
        type="password" 
        name="password"
        placeholder="Password" 
        value={userFormData.password} 
        onChange={handleInputChange}/>
      </Form.Group>
      </Row>
      <h2>Pet Information</h2>
      <Row className="mb-6">
      <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Pet name</Form.Label>
          <Form.Control
            required
            type="text"
            name="petName"
            placeholder="Pet name"
            value={petFormData.petName}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Pet Size</Form.Label>
          <Form.Select defaultValue="Choose..." name="size" value={petFormData.size} onChange={handleInputChange}>
            <option>Choose...</option>
            <option>xl</option>
            <option>lg</option>
            <option>md</option>
            <option>sm</option>
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
            name="age"
            placeholder="Pet age"
            value={petFormData.age}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Pet breed</Form.Label>

          <Form.Control
            required
            type="text"
            name="breed"
            placeholder="Pet breed"
            value={petFormData.breed}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Pet Gender</Form.Label>
          <Form.Select defaultValue="Choose..." name="gender" value={petFormData.gender} onChange={handleInputChange}>
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
            name="gotchaDate"
            value={petFormData.gotchaDate}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Is your pet altered?</Form.Label>
          <Form.Select defaultValue="Choose..." name="altered" value={petFormData.altered} onChange={handleInputChange}>
            <option>Choose...</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Pet's Energy Level</Form.Label>
          <Form.Select defaultValue="Choose..." name="energyLevel" value={petFormData.energyLevel} onChange={handleInputChange.bind(this)}>
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
        <Form.Control 
        type="file"
        name="photoUrl"
        value={petFormData.photoUrl}
        onChange={handleInputChange}
         />
    </Form.Group>
      <Button type="submit" >Submit form</Button>
    </Form>
    </>
  );
}

export default Register;

   