import React, { useEffect, useState } from 'react'

import axios from 'axios'
import Footer from '../common/Footer';
import Header from '../common/Header';
import '../css/Form.css'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../common/FormikControl'

const Profile = () => {
    const token = localStorage.getItem('login')

    const [edit, setEdit] = useState({
        isEdit: false,
    })
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        image: '',
        contry: '',
        countryOptions: [],
        stateOptions: [],
        cityOptions: [],
    })

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/test`,
            {
                headers: {
                    'authentication-token': `${token}`,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then((response) => {
                setProfile({
                    ...profile,
                    name: response.data.name,
                    email: response.data.email,
                    image: response.data.image,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }, [profile.name, profile.email, profile.image]);

    const radioOptions = [
        { key: 'Male', value: 'Male' },
        { key: 'Female', value: 'Female' },
        { key: 'Other', value: 'Other' },
    ]
    const checkBoxOptions = [
        { key: 'Option 1', value: 'Option 1' },
        { key: 'Option 2', value: 'Option 2' },
        { key: 'Option 3', value: 'Option 3' },
    ]
    const initialValues = {
        address: '',
        countryOptions: '',
        stateOptions: '',
        cityOptions: '',
        radioOption: '',
        checkBoxOption: [],
        birthDate: null,
        pincode: '',
    }

    const validationSchema = Yup.object({
        address: Yup.string().required('Required !'),
        countryOptions: Yup.string().required('Required !'),
        stateOptions: Yup.string().required('Required !'),
        cityOptions: Yup.string().required('Required !'),
        radioOption: Yup.string().required('Required !'),
        checkBoxOption: Yup.array().required('Required !'),
        birthDate: Yup.date().required('Required !').nullable(),
        pincode: Yup.string().required('Required !'),
    })

    const onSubmit = values => {
        // debugger
        console.log("submit data", values);
    }

    const editProfile = () => {
        setEdit({
            isEdit: !edit.isEdit
        })

        // -----------country api -------------

        axios.get(`${process.env.REACT_APP_API_URL_COUNTRY}`)
            .then((response) => {
                setProfile({
                    ...profile,
                    countryOptions: response && response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getdata = (value) => {
        {
            !profile.contry && (
                axios.post(`${process.env.REACT_APP_API_URL_COUNTRY}/${value}`)
                    .then((response) => {
                        {
                            response && response.data && (
                                setProfile({
                                    ...profile,
                                    stateOptions: response && response.data,
                                    contry: value
                                })
                            )
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            )
        }

        {
            profile.contry && (
                axios.post(`${process.env.REACT_APP_API_URL_COUNTRY}/${profile.contry}/${value}`)
                    .then((response) => {
                        {
                            response && response.data && (
                                setProfile({
                                    ...profile,
                                    cityOptions: response && response.data,
                                })
                            )
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            )
        }
    }

    return (
        <div>
            <Header />
            <div className="row bgcolore">
                <div className="col-1"></div>
                <div className="col-2 mt-5">
                    <div>
                        <img src={`${profile.image}`} className="rounded-circle" alt="not fount" />
                    </div>
                    <button
                        className="btn btn-success w-50 mt-5 ml-5 p-3"
                        onClick={editProfile}
                    >EDIT MY PROFILE</button>
                </div>

                <div className="col-7">
                    <div className="block p-5">
                        <h2>Welcome back, {profile.name}!</h2>
                    </div>

                    {edit.isEdit && (

                        <div className="block mt-5 p-3">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {
                                    formik => (
                                        <Form>
                                            <FormikControl
                                                control='textarea'
                                                label='Address'
                                                name='address'
                                            />

                                            <FormikControl
                                                control='radio'
                                                label='Gender'
                                                name='radioOption'
                                                options={radioOptions}
                                            />

                                            <FormikControl
                                                control='select'
                                                label='Country'
                                                name='countryOptions'
                                                countryValue={getdata}
                                                options={profile.countryOptions}
                                            />

                                            <FormikControl
                                                control='select'
                                                label='State'
                                                name='stateOptions'
                                                // stateValues={getdata}
                                                countryValue={getdata}
                                                options={profile.stateOptions}
                                            />

                                            <FormikControl
                                                control='select'
                                                label='City'
                                                name='cityOptions'
                                                // options={cityOptions}
                                                countryValue={getdata}
                                                options={profile.cityOptions}
                                            />

                                            <FormikControl
                                                control='date'
                                                label='Birth Date'
                                                name='birthDate'
                                            />

                                            <FormikControl
                                                control='checkbox'
                                                label='Hobby'
                                                name='checkBoxOption'
                                                options={checkBoxOptions}
                                            />

                                            <FormikControl
                                                control='input'
                                                label='Pincode'
                                                name='pincode'
                                                options={checkBoxOptions}
                                            />
                                            <div className="d-flex justify-content-end">
                                                <button type="submit" className="btn btn-success mr-5" onSubmit={() => onSubmit()}>Submit</button>
                                            </div>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Profile
