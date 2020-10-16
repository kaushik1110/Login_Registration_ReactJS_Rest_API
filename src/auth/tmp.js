import React, { useState } from 'react'

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import '../css/Form.css'
import Home from '../page/Home';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

import TextError from './TextError';
const LoginFormikYup = () => {
    const [signIn, setSignIn] = useState({
        isLogin: false
    })

    const initialValues = {
        email: '',
        password: '',
    }
    const history = useHistory();

    const onSubmit = (value) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/login`, value, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                localStorage.setItem('token', response.data)
                if (response.data) {
                    setSignIn({
                        isLogin: true
                    })
                }
                history.push({
                    pathname: "/home",
                })
            })
            .catch((error) => {
                toast.error("Enter valid Email and Password", {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format')
            .required('Required !'),
        password: Yup.string().required('Required !')
         .min(8, 'at least 8 chars')
         .matches(/[a-z]/, 'at least one lowercase char')
         .matches(/[A-Z]/, 'at least one uppercase char')
         .matches(
             /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
             "One Number and one special case Character"
         ),
    })
    const registerHandler = () => {
        history.push({
            pathname: "/registration",
        })
    }
    const obj = localStorage.getItem('login')

    return (
        <div>
            {!obj && (
                <div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {!signIn.isLogin && (

                            <div className="row">
                                <div className='col-md-3'></div>
                                <div className='col-md-6'>
                                    <div>
                                        <center> <h1> Student Registration Form </h1> </center>
                                        <Form className="container form-signin">
                                            <center> <h1> Login </h1> </center>
                                            <div className="form-group ">
                                                <label className="form-label" >Email: </label>
                                                <Field
                                                    name="email"
                                                    className="rounded-pill form-control"
                                                    placeholder="Enter Email"
                                                />
                                                <ErrorMessage name="email" component={TextError} />
                                            </div>

                                            <div className="form-group  ">
                                                <label className="form-label" >Password: </label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    className="rounded-pill form-control"
                                                    placeholder="Enter Password"
                                                />
                                                <ErrorMessage name="password" component={TextError} />
                                            </div>

                                            <div className="form-group text-center">
                                                <button type="submit" className="btn btn-primary rounded-pill mr-4 btn-style">Submit</button>
                                                <button className="btn rounded-pill btn-primary btn-style" onClick={registerHandler}> Registration</button>
                                            </div>
                                            {/* <div className="form-group text-center">
                                                <a href="#">Forgot password? </a>
                                            </div> */}
                                        </Form>
                                    </div>
                                </div>
                                <div className='col-md-3'></div>
                            </div>
                        )}
                    </Formik>
                </div>
            )}
            {obj && (<Home />)}
        </div>
    )
}

export default LoginFormikYup

