import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// object that contains all the input field properties

const TextAreaGroup = ({ name, placeholder, value, error, onChange, info }) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {info && <small className="text-muted form-text">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string
};
export default TextAreaGroup;
