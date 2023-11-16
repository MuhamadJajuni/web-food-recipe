import { Fragment } from "react";
import { Link } from "react-router-dom";
import photo from "../../Assets/images/error.jpeg";

const NotFound = () => {
  return (
    <Fragment>
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <img src={photo} alt="error" width={400} height={400} />
        <h1 className="fw-bold" style={{ color: " #efc81a" }}>
          Sorry
        </h1>
        <h4>That page cannot be found</h4>
        <button
          className="border border-0 rounded px-5 py-2 my-3"
          style={{ backgroundColor: " #efc81a" }}
        >
          <Link to={"/"} className="text-decoration-none fw-bold text-white">
            Go Back
          </Link>
        </button>
      </div>
    </Fragment>
  );
};

export default NotFound;
