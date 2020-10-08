import React from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../auth/TextError";

const Textarea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="textset form-group ">
      <label className="sizetext">{label}:</label>
      <div>
        <Field as="textarea" name={name} {...rest} />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
};

export default Textarea;
