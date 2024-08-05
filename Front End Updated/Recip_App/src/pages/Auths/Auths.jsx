import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './Auth.css';

export default function Auths() {
  return (
    <>
    <h2>Login/Register</h2>
    <div className="auth">
      <Login />
      <Register />
    </div>
    </>
  );
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const Response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });

      setCookies("access_token", Response.data.token);
      console.log(Response.data.token);
      console.log(Response.data.useID)
      window.localStorage.setItem("userID", Response.data.useID);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8000/auth/register", {
        username,
        password,
      });

      alert("Registeration Successfull");
    } catch (err) {
      alert(`Error In Registeration ${err}`);
    }
  };
  return (
    <AuthForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const AuthForm = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <Form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Full Name:</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            placeholder="Enter User Name"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          {label}
        </Button>
      </Form>
    </div>
  );
};
