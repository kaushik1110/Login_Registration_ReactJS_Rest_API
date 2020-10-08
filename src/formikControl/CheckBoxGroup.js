import React from "react";

import { ErrorMessage, Field } from "formik";
import TextError from "../auth/TextError";

const CheckBoxGroup = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className='textset'>
      <label className="sizetext">{label}</label>
      <div>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div key={option.value}>
                <input
                  type="checkbox"
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
};

export default CheckBoxGroup;
