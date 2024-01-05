import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsCamera } from "react-icons/bs";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user from "../../../../Assets/images/logo-apk.png";
import {updateProfile} from "../../../../Redux Toolkit/Slice/userSlice"
import "./style/edit.css";
const Index = () => {
  const { userId } = useParams();
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const [dataUser, setDataUser] = useState({
    name: "",
    photo: "",
    photoUrl: "",
  });
  const [profile, setProfile] = useState(null);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    function getProfile() {
      return axios.get(
        import.meta.env.VITE_REACT_BACKEND_URL + `/detail/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    }

    getProfile().then((res) => {
      setProfile(res.data);
    });
  }, [userId, userToken]);
  const { isLoading, isError } = useSelector((state) => state.users);
  const handleInput = (e) => {
    const { value, name } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };
  const handlePhoto = (e) => {
    const selectedPhoto = e.target.files[0];
  
    setPhoto(selectedPhoto);
  
    setDataUser({
      ...dataUser,
      photo: selectedPhoto, // Set the photo field to the actual File object
      photoUrl: URL.createObjectURL(selectedPhoto),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let bodyFormData = new FormData();
    bodyFormData.append("name", dataUser.name);
    bodyFormData.append("photo", dataUser.photo);
  
    try {
      await dispatch(updateProfile(bodyFormData, userId));
      window.location.reload();
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
    <Fragment>
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
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-center align-items-center flex-column mt-5">
              <img
                className="size-img my-3"
                src={
                  dataUser.photoUrl ||
                  dataUser.photo ||
                  profile?.data[0]?.photo ||
                  user
                }
                alt="Profile"
              />
              <Form.Group className="d-flex flex-column align-items-center">
                <Form.Label htmlFor="upload-photo">
                  <div className="d-flex gap-2">
                    <BsCamera size={25} />
                    Change Profile Picture
                  </div>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  id="upload-photo"
                  onChange={handlePhoto}
                />
              </Form.Group>
              <p className="text-center fw-bold fs-4">
                {dataUser.name || profile?.data[0]?.name}
              </p>
              <Col md={4}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={dataUser.name}
                      onChange={handleInput}
                      name="name"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="border border-0 w-100 fw-semibold text-white mt-3 py-2"
                    style={{ backgroundColor: "#efc81a" }}
                  >
                    Update Profile
                  </Button>
                </Form>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
