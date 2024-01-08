/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BiBookmark, BiLike } from "react-icons/bi";
import { ProgressBar } from "react-loader-spinner";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import photo from "../../../../Assets/images/user-demo.jpg";
import { detailRecipes } from "../../../../Redux Toolkit/Slice/recipeSlice";
import "./detail.css";

const Index = () => {
  const { menuId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const recipe = useSelector((state) => state.recipes.entities[menuId]);

  useEffect(() => {
    dispatch(detailRecipes(menuId));
  }, [dispatch, menuId]);

  if (isLoading || !recipe) {
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
        position="top-right"
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
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                <div
                  style={{
                    height: "60px",
                    width: "5px",
                    backgroundColor: "#efc81a",
                  }}
                ></div>
                <div>
                  <img
                    src={photo}
                    alt="profile"
                    width={50}
                    className="rounded rounded-circle profile-photo"
                  />
                </div>
                <div>
                  <p className="m-0">{recipe.data.author}</p>
                  <p className="m-0 fw-bold">{recipe.data.category}</p>
                </div>
              </div>

              <div>
                <p className="m-0">
                  {new Date(recipe.data.create_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="m-0">20 Likes - Comments</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <h1 className="fw-bold text-center mb-5 color">
            {recipe.data.title}
          </h1>
          <Col md={12} className="d-flex justify-content-center">
            <img
              className="object-fit-cover rounded main-photo"
              src={recipe.data.image}
              alt="image"
              width="800px"
              height="450px"
            />
          </Col>
        </Row>
        <Col md={12} className="my-5">
          <h3 className="fw-semibold">Ingredients</h3>
          <ul>
            {recipe.data.ingredients?.split(",").map((ingredient, index) => (
              <li key={index} className="py-1">
                {ingredient.trim()}
              </li>
            ))}
          </ul>
        </Col>
        <Col md={12} className="my-5">
          <h3 className="fw-semibold mb-3">Video Recipes</h3>
          <Col
            md={12}
            className="d-flex justify-content-center align-items-center"
          >
            <div style={{ marginTop: "15px", marginBottom: "20px" }}>
              <ReactPlayer
                url={recipe.data.videolink}
                width="800px"
                height="500px"
                controls={true}
              />
            </div>
          </Col>
        </Col>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="d-flex gap-3 my-5"
        >
          <Button
            className="rounded border-0"
            style={{ backgroundColor: "#efc81a" }}
          >
            <BiBookmark size={30} />
          </Button>
          <Button
            className="rounded border border-warning py-1 px-2"
            style={{ backgroundColor: "white" }}
          >
            <BiLike color="#efc81a" size={30} />
          </Button>
        </div>
      </Container>

      <div className="container my-5">
        <Form>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label"></label>
            <textarea
              className="form-control"
              id="comment_text"
              rows="5"
              placeholder="Your Comment Here!"
              style={{ backgroundColor: "#f6f5f4" }}
              name="comment_text"
            ></textarea>
          </div>
          <button
            className="rounded border border-0 text-white fw-bold p-2"
            style={{ backgroundColor: "#ffb167" }}
          >
            Send a comment
          </button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Index;
