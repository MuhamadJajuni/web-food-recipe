import PropTypes from "prop-types";
import logo from "../../../Assets/images/logo-apk.png";

const Index = (props) => {
  return (
    <>
      <div className="mt-5 text-center">
        <img src={logo} alt="logo" width="100px" />
        <h4 className="my-3 fw-bold" style={{ color: "#efc81a" }}>
          {props.judul}
        </h4>
        <p>{props.text}</p>
      </div>
    </>
  );
};

Index.propTypes = {
  judul: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Index;
