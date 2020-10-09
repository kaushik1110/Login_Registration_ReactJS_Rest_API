import React from "react";

import { ErrorMessage, Field } from "formik";
import TextError from "../auth/TextError";

const Select = (props) => {
  const { label, name, options, ...rest } = props;
  debugger;
  return (
    <div className="textset">
      <label className="sizetext">{label}</label>
      <div>
        <Field as="select" name={name} {...rest}>
          {options.map((option) => {
            debugger;
            return (
              <option key={option.code} value={option.name}>
                {option.name}
              </option>
            );
          })}
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
};

export default Select;
