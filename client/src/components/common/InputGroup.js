import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// object that contains all the input field properties

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  label,
  icon
}) => {
  return (
    <div className="input-group mb-4">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};
export default InputGroup;
