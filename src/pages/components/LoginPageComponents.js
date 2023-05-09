import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function LoginPageComponent({ setReduxUserState, loginUser, reduxDispatch }) {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState({
    loading: false,
    userLoggedIn: {},
  });
  const test = useSelector((state) => state.userRegisterLogin);

  const handleSubmit = (event) => {
    setLoginStatus((prev) => ({ ...prev, loading: true }));
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const email = form.email.value;
    const password = form.password.value;
    const doNotLogout = form.doNotLogOut.checked;

    if (event.currentTarget.checkValidity() === true && email && password) {
      loginUser({ email, password, doNotLogout }).then((res) => {
        if (res.EC === 0) {
          const loginUserData = res.userLoggedIn;
          setLoginStatus((prev) => ({ ...prev, ...res, loading: false }));

          reduxDispatch(setReduxUserState(loginUserData));

          if (loginUserData.doNotLogout)
            localStorage.setItem("userInfo", JSON.stringify(loginUserData));
          else
            sessionStorage.setItem("userInfo", JSON.stringify(loginUserData));
          navigate("/user/my-orders", { replace: true });
        }
      });
      setLoginStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (test._id) {
      navigate("/user/my-orders", { replace: true });
    }
  });

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label className="mb-3" as="h1">
              Login
            </Form.Label>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email address"
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="password"
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Please enter password.
              </Form.Control.Feedback>

              <Form.Check
                className="mt-3"
                label="Do not logout"
                type="checkbox"
                name="doNotLogOut"
              />
            </Form.Group>

            <Row>
              <Col>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </Col>
            </Row>
            <Button type="submit">
              {loginStatus.loading === true ? (
                <Spinner
                  className="me-1"
                  animation="border"
                  role="status"
                  size="sm"
                />
              ) : (
                ""
              )}
              Submit
            </Button>
          </Form>

          <Alert show={loginStatus?.EC === 1} className="mt-3" variant="danger">
            Wrong credentials
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPageComponent;
