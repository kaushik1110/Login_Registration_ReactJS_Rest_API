import React from 'react'
import Textarea from '../formikControl/Textarea'
import ChakraInput from '../formikControl/ChakraInput'
import CheckBoxGroup from '../formikControl/CheckBoxGroup'
import DatePiker from '../formikControl/DatePiker'
import Input from '../formikControl/Input'
import RadioButton from '../formikControl/RadioButton'
import Select from '../formikControl/Select'

const FormikControl = (props) => {
  
    const { control, ...rest } = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'textarea':
            return <Textarea {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'radio':
            return <RadioButton {...rest} />
        case 'checkbox':
            return <CheckBoxGroup {...rest} />
        case 'date':
            return <DatePiker {...rest} />
        case 'chakrainput':
            return <ChakraInput {...rest} />
        default: return null
    }
}

export default FormikControl