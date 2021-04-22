import React from 'react';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

export default function Navbar() {

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 border-b border-gray">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-700 hover:no-underline"  href="/">
                            KEYBOUND
                        </a>
                        <button className="text-gray-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <button className="text-base px-3 py-2 flex items-center text-xs font-bold leading-snug text-gray-700 hover:opacity-75 focus:outline-none"
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                >
                                    Sign Up / LOGIN
                                </button> 
                            </li>
                        </ul>
                    </div> 
                </div>
            </nav>

            { /*Login Modal*/ }

            {showModal ? (
            <>
                <div className="justify-center xl:items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">        
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/* Content */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h4 className="text-2xl font-semibold text-gray-700">
                                    Log In / Sign Up
                                </h4>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                    </span>
                                </button>
                            </div>
                            {/* Body */}
                            <div className="relative p-6 flex-auto grid grid-cols-1 md:grid-cols-2 space-y-8 md:space-y-0">
                                <Formik 
                                    initialValues={{ username: '', password: ''}}
                                    validationSchema={Yup.object({
                                        username: Yup.string()
                                            .min(4, 'Must be 4 characters or more')
                                            .required('Required'),
                                        password: Yup.string()
                                            .min(8, 'Must be 8 characters or more')
                                            .required('Required')
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout (() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false)
                                        }, 400);
                                    }}
                                >
                                    <Form className="space-y-4 md:mr-3 border-b border-solid pb-8 md:border-r md:border-b-0 md:pr-8"> 
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <Field name="username" type="text" placeholder="Username" className="px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                        </div>
                                        <ErrorMessage name="username" />
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <Field name="password" type="password" placeholder="Password" className="px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                        </div>
                                        <ErrorMessage name="password" />
                                        <div>
                                            <button
                                                className="text-gray-700 active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow border border-gray-700 hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                /*onClick={() => setShowModal(false)}*/
                                            >
                                                Log In
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                                <Formik
                                    initialValues={{ email: '', username: "", password: ''}}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email('Invalid email address')
                                            .required('Required'),
                                        username: Yup.string()
                                            .min(4, 'Must be 4 characters or more')
                                            .required('Required'),
                                        password: Yup.string()
                                            .min(8, 'Must be 8 characters or more')
                                            .required('Required')
                                    })}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout (() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false)
                                        }, 400);
                                    }}
                                >
                                    <Form className="space-y-4 md:ml-3">
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                            <Field name="email" type="email" placeholder="Email" className="px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                        </div>
                                        <ErrorMessage name="email" />
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <Field name="username" type="text" placeholder="Username" className="px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                        </div>
                                        <ErrorMessage name="username" />
                                        <div className="relative flex w-full flex-wrap items-stretch">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <Field name="password" type="password" placeholder="Password" className="px-3 py-3 pl-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                        </div>
                                        <ErrorMessage name="password" />
                                        <div>
                                            <button
                                                className="bg-gray-700 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                                /*onClick={() => setShowModal(false)}*/
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            {/* Footer */}
                            <div className="flex items-center p-1 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            ): null}
        </>
    ); 
}



