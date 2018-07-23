import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// object that contains all the input field properties

const SelectFieldGroup = ({ name, value, error, onChange, options, info }) => {
  const SelectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {" "}
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        value={value}
        onChange={onChange}
        name={name}
      >
        {SelectOptions}
      </select>
      {info && <small className="text-muted form-text">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  options: PropTypes.array.isRequired
};
export default SelectFieldGroup;
