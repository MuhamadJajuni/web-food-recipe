/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonAuth from "../../ButtonCheckAuth/Index";
import CheckBookAuth from "../../Checkbox/Index";
import InputCheck from "../../Form/FormInput";
import InputPassCheck from "../../Form/FormPassword";
import Header from "../../Header/Index";
import { registerUsers } from "../../../../Redux Toolkit/Slice/authSlice";

const FormRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Dispatch the registerUsers action with the user details
      await dispatch(registerUsers({ name, email, password }));

      // Redirect to the desired page upon successful registration
      navigate("/login");
    } catch (error) {
      // Handle registration failure, e.g., display an error message
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingLeft: "50px",
        }}
      >
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      </div>
    );
  }

  return (
    <>
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          transition={Slide}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Row>
          <Col
            md={12}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <Col md={4}>
              <Header
                judul="Let's Get Started!"
                text="Create a new account to access all features"
              />
              <Form onSubmit={handleSubmit}>
                <InputCheck
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Name"
                />

                <InputCheck
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
                <InputPassCheck
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter Password"
                />
                <CheckBookAuth
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <ButtonAuth text="Register Now" />
                <p className="mt-3 d-flex justify-content-center align-items-center">
                  Already have an account?
                  <span>
                    <Link
                      to="/login"
                      style={{ color: "#efc81a" }}
                      className="text-decoration-none"
                    >
                      Log in Here
                    </Link>
                  </span>
                </p>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormRegister;
