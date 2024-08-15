import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';


function Login() {

    const [login, { error }] = useMutation(LOGIN_USER);
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });

    const handleInputChange = (event) => {
        const { target } = event;
        const inputType = target.name;
        const inputValue = target.value;
        setUserFormData({ ...userFormData, [inputType]: inputValue });
    };

    const handleSubmit = async (event) => { 
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { credentials: userFormData },
            });
            console.log(data);
            Auth.login(data.login.token);
        }
        catch (e) {
            console.error(e);
            console.log(error);
        }
    };
 

  return (
    <>
    <h2>User Login</h2>
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={userFormData.email} onChange={handleInputChange}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={userFormData.password} onChange={handleInputChange} />
      </Form.Group>
    </Form>
    </>
  );
}

export default Login;