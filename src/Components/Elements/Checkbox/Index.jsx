import PropTypes from "prop-types";

const Index = ({ onChange }) => {
  return (
    <>
      <div className="mb-3 d-flex gap-3" style={{ accentColor: " #efc81a" }}>
        <input type="checkbox" onChange={onChange} />
        <label>I agree to terms and condition</label>
      </div>
    </>
  );
};
Index.propTypes = {
  onChange: PropTypes.func,
};

export default Index;
