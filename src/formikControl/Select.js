import React, { useEffect, useState } from "react";

import { ErrorMessage, Field } from "formik";
import TextError from "../auth/TextError";

const Select = (props) => {
  const { label, name, options, countryData, ...rest } = props;
  const [data, setData] = useState();

  const changeHandler = (e) => {
    setData(e.target.value);
  };

  useEffect(() => {
    {
      data && (
        countryData(data)
      )
    }
  }, [data]);

  return (
    <div className="textset">
      <label className="sizetext">{label}</label>
      <div>
        <Field as="select" name={name} {...rest} onChange={(e) => changeHandler(e, name)} value={data}>
          <option key="" value="">
            Select a option
          </option>
          {options.map((option) => {
            if (option && option.name) {
              return (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              );
            } else {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }
          })}
        </Field>

        <ErrorMessage name={name} component={TextError} />
      </div>
    </div>
  );
};

export default Select;
