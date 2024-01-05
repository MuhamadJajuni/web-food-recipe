import { useState } from "react";
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
import { loginUsers } from "../../../../Redux Toolkit/Slice/authSlice";

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Dispatch the loginUsers action with the email and password
      await dispatch(loginUsers({ email, password }));

      // Redirect to the desired page upon successful login
      navigate("/home");
    } catch (error) {
      // Handle login failure, e.g., display an error message
      console.error("Login failed:", error);
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
          autoClose={2000}
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
              <Header judul="Welcome" text="Log in into your exiting account" />
              <Form onSubmit={handleSubmit}>
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
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />

                <CheckBookAuth
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <ButtonAuth text="Login" />
                <p className="mt-3 d-flex justify-content-center align-items-center">
                  Dont have an account?
                  <span>
                    <Link
                      to="/register"
                      style={{ color: " #efc81a" }}
                      className="text-decoration-none"
                    >
                      Sign Up
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

export default FormLogin;
