/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ProgressBar } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  detailRecipes,
  updateRecipe,
} from "../../../../Redux Toolkit/Slice/recipeSlice";
import "./update.css";
const UpdateProduct = () => {
  const [isLoading, setIsLoading] = useState();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [videolink, setVideolink] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuId } = useParams();
  const recipes = useSelector((state) => state.recipes.entities[menuId]);

  useEffect(() => {
    dispatch(detailRecipes(menuId));
  }, [dispatch, menuId]);

  useEffect(() => {
    if (recipes) {
      console.log(recipes.data.title);
      setTitle(recipes.data.title);
      setIngredients(recipes.data.ingredients);
      setVideolink(recipes.data.videolink);
      setCategory_id(recipes.data.category_id);
      setImage(recipes.data.image);
      setPreviewImage(recipes.data.image);
    }
  }, [recipes]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        updateRecipe({
          menuId,
          title,
          ingredients,
          videolink,
          category_id,
          image,
        })
      );
      navigate("/detail_profile");
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
      <Container className="my-5">
        <ToastContainer
          position="bottom-center"
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
            <Form.Label htmlFor="formvideo"></Form.Label>
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
              Update
            </button>
          </div>
        </Form>
      </Container>
    </Fragment>
  );
};

export default UpdateProduct;
