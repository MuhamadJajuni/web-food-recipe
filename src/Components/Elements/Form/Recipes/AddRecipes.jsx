/* eslint-disable no-undef */
import { Fragment, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addRecipe } from "./../../../../Redux/Action/RecipesAction";
import "./update.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.productReducer);
  const [image, setImage] = useState(null);
  const [inputData, setInputData] = useState({
    title: "",
    ingredients: "",
    videolink: "",
    category_id: "",
    photo_url: "",
  });

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo_url: URL.createObjectURL(e.target.files[0]),
      });
  };

  const postRecipe = async (e) => {
    e.preventDefault();

    const { title, ingredients, videolink, category_id, photo_url } = inputData;
    if (!title || !ingredients || !videolink || !category_id || !photo_url) {
      toast.error("Please fill in all the fields");
      return;
    }
    const data = new FormData();
    data.append("title", inputData.title);
    data.append("ingredients", inputData.ingredients);
    data.append("videolink", inputData.videolink);
    data.append("category_id", inputData.category_id);
    data.append("image", image);

    console.log(image);

    try {
      await dispatch(addRecipe(data, navigate));
      console.log(data.data.videoLink);
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
        <Form onSubmit={postRecipe}>
          <div className="mb-3">
            <p className="d-flex justify-content-end m-0">Max File 1MB</p>
            <label
              className="addphoto w-100"
              style={{ height: "250px" }}
              htmlFor="upload-photo"
            >
              <div className="input-photo" id="addphotowrapper">
                {image && (
                  <img src={inputData.photo_url} className="input-photo" />
                )}
                <p>Add Photo</p>
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="upload-photo"
              onChange={handleImage}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formtitle"></Form.Label>
            <Form.Control
              type="text"
              id="formtitle"
              name="title"
              value={inputData.title}
              onChange={handleInput}
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
              value={inputData.ingredients}
              onChange={handleInput}
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
                  value={inputData.videolink}
                  onChange={handleInput}
                  placeholder="Share Video Link"
                  style={{ backgroundColor: "#f6f5f4" }}
                />
          </div>
          <Row>
            <Col md={3} className="mt-4">
              <Form.Select
                className="form-select form-select-sm py-3 bg-body-tertiary"
                aria-label="select example"
                value={inputData.category_id}
                onChange={handleInput}
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
              Post
            </button>
          </div>
        </Form>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
