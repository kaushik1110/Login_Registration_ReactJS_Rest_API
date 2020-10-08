import React from 'react'

import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core'
import { Field } from 'formik'
// import { FormControl, FormLabel } from 'react-bootstrap'

const ChakraInput = (props) => {
    const { label, name, ...rest } = props
    return (
        <Field name={name}>
            {

                ({ field, form }) => {
                    console.log(form);
                    return (
                        <div className="textset form-group ">
                            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
                                <FormLabel>{label}</FormLabel>
                                <div>
                                <Input {...rest} {...field} />
                                <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                                </div>
                            </FormControl>
                        </div>
                    )
                }
            }
        </Field>
    )
}

export default ChakraInput