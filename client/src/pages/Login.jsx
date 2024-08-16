import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
  const [loginError, setLoginError] = useState(null);

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER, {
    variables: {
      credentials: userFormData,
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log(userFormData);
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
      setLoginError(error);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <h2>User Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userFormData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={userFormData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* <Button type="submit">Submit form</Button> */}
        <Button type="submit" variant="success">
          Login
        </Button>
      </Form>

      {/* error modal */}
      <Modal show={loginError !== null}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginError
            ? loginError.message
            : "An unknown error occured. Please try again!"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLoginError(null)}>
            Okie Dokie!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
