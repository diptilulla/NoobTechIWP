import React from "react";

import "./form-input.styles.scss";

const FormInput = (
  { handleChange, label, ...otherProps } //other props are type name value etc
) => (
  <div className={`group ${otherProps.margin && "margin"}`}>
    <input
      className={`form-input ${otherProps.margin && "margin-input"}`}
      {...otherProps}
      onChange={handleChange}
    />
    {
      label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null //if the developer passes label prop then label is rendered otherwise null rendered
    }
  </div>
);

export default FormInput;
