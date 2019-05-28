import React from "react";

const Checkbox = ({ name, label, ...rest }) => {
  return (
    <div className="form-group form-check">
      <input
        {...rest}
        name={name}
        id={name}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
