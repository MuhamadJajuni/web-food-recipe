import PropTypes from "prop-types";
import style from "./style.module.css";
const FormInput = (props) => {
  const { label, type, placeholder, name, value, onChange } = props;
  return (
    <>
      <div className="mb-3">
        <label className="form-label">{label} :</label>
        <input
          type={type}
          className={`form-control ${style.form_control}`}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};
FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormInput;
