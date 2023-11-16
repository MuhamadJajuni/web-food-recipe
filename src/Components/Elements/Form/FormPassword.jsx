import PropTypes from "prop-types";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import style from "./style.module.css";

const FormPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { label, type, placeholder, name, value, onChange } = props;
  return (
    <>
      <div className="mb-3">
        <label className="form-label">{label} :</label>
        <div className={`${style.input_container}`}>
          <input
            type={showPassword ? "text" : type}
            className={`form-control ${style.form_control}`}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          <span
            className={`${style.password_icon}`}
            onClick={toggleShowPassword}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        </div>
      </div>
    </>
  );
};
FormPassword.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormPassword;
