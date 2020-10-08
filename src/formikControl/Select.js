import React from 'react'

import { ErrorMessage, Field } from 'formik'
import TextError from '../auth/TextError'

const Select = (props) => {
    const { label, name, options, ...rest } = props
    return (
        <div className="textset">
            <label className="sizetext">{label}</label>
            <div>
            <Field as='select' name={name} {...rest}>
                {
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
            </div>
        </div>
    )
}

export default Select