import React from 'react'

import { ErrorMessage, Field } from 'formik'
import DateView from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import TextError from '../auth/TextError'

const DatePiker = (props) => {
    const { label, name, ...rest } = props  
    
    return (
        <div className='textset'> 
            <label className="sizetext">{label}</label>
            <div>
            <Field name={name}>
                {
                    ({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return (
                            <DateView
                                {...field}
                                {...rest}
                                selected={value}
                                onChange={val => setFieldValue(name, val)}
                            />
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError} />
            </div>
        </div>
    )
}

export default DatePiker