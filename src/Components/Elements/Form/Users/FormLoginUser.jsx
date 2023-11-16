import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonAuth from "../../ButtonCheckAuth/Index";
import CheckBookAuth from "../../Checkbox/Index";
import InputCheck from "../../Form/FormInput";
import InputPassCheck from "../../Form/FormPassword";
import Header from "../../Header/Index";
import { actionLogin } from "./../../../../Redux/Action/AuthAction";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    if (!isChecked) {
      toast.warning("Please check the checkboox");
      return;
    }
    try {
      await dispatch(actionLogin(formData, navigate));
    } catch (error) {
      toast.error(isError || "Internal server error");
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
        borderColor = '#F4442E'
        barColor = '#51E5FF'
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
              <Form onSubmit={handleLogin}>
                <InputCheck
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                />
                <InputPassCheck
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />

                <CheckBookAuth checked={isChecked} onChange={handleCheckbox} />
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
