/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Fragment, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRecipes } from "../../../../Redux Toolkit/Slice/recipeSlice";
import "./update.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [videolink, setVideolink] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        addRecipes({ title, ingredients, videolink, category_id, image })
      );
      window.location.reload();
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Container className="my-5">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
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
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="d-flex justify-content-end m-0">Max File 1MB</p>
            <label
              className="addphoto w-100"
              style={{ height: "250px" }}
              htmlFor="upload-photo"
            >
              <div className="input-photo" id="addphotowrapper">
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="uploaded"
                    className="input-photo"
                  />
                )}
                <p>Add Photo</p>
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formtitle"></Form.Label>
            <Form.Control
              type="text"
              id="formtitle"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              style={{ backgroundColor: "#f6f5f4" }}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formingredients"></Form.Label>
            <Form.Control
              as="textarea"
              id="formingredients"
              name="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={5}
              placeholder="Ingredients"
              style={{ backgroundColor: "#f6f5f4", height: "200px" }}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formvideo">Video Link</Form.Label>
            <Form.Control
              type="text"
              id="formvideo"
              name="videolink"
              value={videolink}
              onChange={(e) => setVideolink(e.target.value)}
              placeholder="Share Video Link"
              style={{ backgroundColor: "#f6f5f4" }}
            />
          </div>
          <Row>
            <Col md={3} className="mt-4">
              <Form.Select
                className="form-select form-select-sm py-3 bg-body-tertiary"
                aria-label="select example"
                value={category_id}
                onChange={(e) => setCategory_id(e.target.value)}
                name="category_id"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="1">Main Course</option>
                <option value="2">Dessert</option>
                <option value="3">Appetizer</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="my-5 d-flex justify-content-center">
            <button
              type="submit"
              className="border border-0 py-2 px-5 fw-bold text-white rounded"
              style={{ backgroundColor: " #efc81a" }}
            >
              {isLoading ? (
                <ProgressBar
                  height={20}
                  width={20}
                  ariaLabel="progress-bar-loading"
                  type="Oval"
                  color="#fff"
                />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </Form>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
