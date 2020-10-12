import React, { useEffect, useState } from "react";

import { ErrorMessage, Field } from "formik";
import TextError from "../auth/TextError";

const Select = (props) => {
  const { label, name, options, countryData, ...rest } = props;
  const [data, setData] = useState();

  const changeHandler = (e) => {
    debugger;
    setData(e.target.value);
    countryData(e.target.value);
    debugger

    // debugger
  };

  // useEffect(() => {
  //   // {
  //   // debugger;
  //   // data &&
  //   countryData(data);
  //   // console.log("sasa");
  //   // }
  // }, [data]);

  console.log(data);
  return (
    <div className="textset">
      <label className="sizetext">{label}</label>
      <div>
        <Field
          as="select"
          name={name}
          {...rest}
          onChange={(e) => changeHandler(e, name)}
          value={data}
        >
          {options.map((option) => {
            // debugger
            return (
              <option key={option.code} value={option.code}>
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
