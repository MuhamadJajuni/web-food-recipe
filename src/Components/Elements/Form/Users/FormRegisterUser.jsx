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
import { actionRegister } from "./../../../../Redux/Action/AuthAction";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (!isChecked) {
      toast.warning("Please check the checkbox");
      return;
    }
    try {
      await dispatch(actionRegister(formData, navigate));
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
                text="Create new account to access all features"
              />
              <Form onSubmit={handleSubmit}>
                <InputCheck
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Name"
                />

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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Password"
                />
                <CheckBookAuth onChange={(checked) => setIsChecked(checked)} />
                <ButtonAuth text="Register Now" />
                <p className="mt-3 d-flex justify-content-center align-items-center">
                  Already have account?
                  <span>
                    <Link
                      to="/login"
                      style={{ color: " #efc81a" }}
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
