import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsCamera } from "react-icons/bs";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getProfile,
  updateProfile,
} from "../../../../Redux Toolkit/Slice/userSlice";
import "./style/edit.css";

const Index = () => {
  const [isLoading, setIsLoading] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const users = useSelector((state) => state.users.entities[userId]);

  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    setIsLoading(true);
    if (users && users.data) {
      console.log(users.data[0]);
      setName(users.data[0].name);
      setPhoto(users.data[0].photo);
      setPreviewImage(users.data[0].photo);
    }
    setIsLoading(false);
  }, [users]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setPhoto(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(updateProfile({ userId, name, photo }));
      window.location.reload();
    } catch (error) {
      console.log(error);
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
              <img className="size-img my-3" src={previewImage} alt="Profile" />
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
                  onChange={handleImageChange}
                />
              </Form.Group>
              <p className="text-center fw-bold fs-4">{name}</p>
              <Col md={4}>
                <Form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label
                      className="addphoto w-100"
                      style={{ height: "250px" }}
                      htmlFor="upload-photo"
                    >
                      <div className="input-photo" id="addphotowrapper">
                        <img src={previewImage} className="input-photo" />

                        <p>Change Photo</p>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="upload-photo"
                      onChange={handleImageChange}
                    />
                  </div>
                  <Form.Group>
                    <Form.Label>Name :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
