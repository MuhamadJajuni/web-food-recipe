import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from "./style.module.css";

const Head = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const getAllData = useCallback(
    (page) => {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_REACT_BACKEND_URL + `/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page,
            limit: 5,
            searchBY: "title",
            search: searchQuery,
          },
        })
        .then((res) => {
          setData(res.data);
          setTotalPage(res.data.pagination.totalPage);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [searchQuery]
  );

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1);
    getAllData(1);
  };

  const handleNext = useCallback(() => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPage]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  useEffect(() => {
    getAllData(currentPage);
  }, [getAllData, currentPage]);

  const nextDisabled = currentPage >= totalPage;
  const previousDisabled = currentPage === 1;
  return (
    <Fragment>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="fw-bold color mt-5">
              Discover Recipe <br />& Delicious Food
            </h1>
          </Col>
          <Col md={8} className="mt-3 mb-5">
            <Form
              className="form-inline d-flex justify-content-center"
              onSubmit={handleSearchSubmit}
            >
              <InputGroup className="gap-4">
                <FormControl
                  type="text"
                  className={`${style.form_control} form-control rounded`}
                  placeholder=" Search Recipe"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="fw-bold text-white rounded border border-0 py-2 px-3"
                    style={{ backgroundColor: " #efc81a" }}
                  >
                    Search
                  </button>
                </div>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={3} className="mb-2">
            <button
              className="fw-bold text-white rounded border border-0 py-1 px-3"
              style={{ backgroundColor: " #efc81a" }}
            >
              New
            </button>
          </Col>
          <div className="col-md-3 mb-2">
            <button
              className="fw-bold text-white rounded border border-0 py-1 px-3"
              style={{ backgroundColor: " #efc81a" }}
            >
              Popular
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className="fw-bold text-white rounded border border-0 py-1 px-3"
              style={{ backgroundColor: " #00e092" }}
            >
              Lunch
            </button>
          </div>
          <div className="col-md-3 mb-2">
            <button
              className="fw-bold text-white rounded border border-0 py-1 px-3"
              style={{ backgroundColor: " #00e092" }}
            >
              Dinner
            </button>
          </div>
        </Row>
      </Container>

      <Container className="p-2 my-2 rounded">
        {data?.data?.map((item, index) => {
          return (
            <div key={index}>
              <Row className="my-5">
                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Link to={`/detail_recipe/${item.id}`}>
                    <img
                      src={item.image}
                      alt="menu"
                      className="rounded object-fit-cover"
                      width={280}
                      height={280}
                    />
                  </Link>
                </Col>
                <Col md={8} className={`${style.center_content}`}>
                  <div>
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="fs-5 m-0">Ingredients</p>
                    <ul>
                      {item.ingredients.split(",").map((ingredient, index) => (
                        <li key={index}>{ingredient.trim()}</li>
                      ))}
                    </ul>
                    <button
                      className="mb-2 text-white rounded border border-0 p-1 fw-bold"
                      style={{ backgroundColor: "#efc81a" }}
                    >
                      10 Likes - 2 Coments - 4 Bookmark
                    </button>
                    <div className="d-flex gap-2 my-2">
                      <p className="fw-bold m-0">Author :</p>
                      <p className="m-0 d-flex align-items-center fw-semibold">
                        {item.author}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}

        <div className="my-5 d-flex justify-content-center gap-5">
          <button
            className="mb-2 text-white rounded border border-0 fw-bold py-2 px-4"
            style={{ backgroundColor: " #efc81a" }}
            onClick={handlePrevious}
            disabled={previousDisabled}
          >
            <FaArrowLeft /> Previous
          </button>

          <div className="d-flex align-items-center">
            Show {data?.pagination?.pageNow} From {data?.pagination?.totalPage}
          </div>
          <button
            className="mb-2 text-white rounded border border-0 fw-bold py-2 px-5"
            style={{ backgroundColor: " #efc81a" }}
            onClick={handleNext}
            disabled={nextDisabled}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </Container>
    </Fragment>
  );
};

export default Head;
