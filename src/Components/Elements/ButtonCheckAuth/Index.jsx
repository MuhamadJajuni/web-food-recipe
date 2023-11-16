import PropTypes from "prop-types";

const Index = (props) => {
  return (
    <>
      <button
        type="submit"
        className="btn w-100 fw-semibold text-white"
        style={{ backgroundColor: " #efc81a" }}
      >
        {props.text}
      </button>
    </>
  );
};
Index.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Index;
