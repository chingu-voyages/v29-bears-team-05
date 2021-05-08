/* eslint-disable no-alert */
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Auth from '../service/auth';
import { useRouter } from 'next/router';
import Token from '../service/token';
import Users from '../service/user';

const SignIn = ({ setShowModal }) => {
  const router = useRouter();

  const handleLogin = async (values) => {
    return await Auth.login(values)
      .then((res) => {
        const token = res.token;
        const username = res.user.username;
        Token.saveAuthToken(token);
        Auth.saveUsername(username);
        setShowModal(false);
        router.push(`/sheets`);
      })
      .catch((err) => {
        console.log('err.message', err.message);
        if (err.message === 'Unauthorized') {
          alert('Incorrect username or password');
        } else {
          alert('Something went wrong, please try again');
        }
      });
  };

  const handleSignUp = async (values) => {
    return await Users.register(values)
      .then((res) => {
        if (res) {
          const username = values.username;
          const password = values.password;
          handleLogin({ username, password });
        }
      })
      .catch((err) => {
        if (err.message === 'Conflict') {
          alert('Username and/or user email taken');
        } else {
          alert('Something went wrong, please try again');
        }
      });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center overflow-x-hidden overflow-y-auto outline-none xl:items-center focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* Content */}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
              <h4 className="text-2xl font-semibold text-gray-700">
                Log In / Sign Up
              </h4>
              <button
                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* Body */}
            <div className="relative grid flex-auto grid-cols-1 p-6 space-y-8 md:grid-cols-2 md:space-y-0">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object({
                  username: Yup.string()
                    .min(4, 'Must be 4 characters or more')
                    .required('Required'),
                  password: Yup.string()
                    .min(8, 'Must be 8 characters or more')
                    .required('Required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  await handleLogin(values);
                  setSubmitting(false);
                }}
              >
                <Form className="pb-8 space-y-4 border-b border-solid md:mr-3 md:border-r md:border-b-0 md:pr-8">
                  <div className="relative flex flex-wrap items-stretch w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="relative w-full px-3 py-3 pl-10 pr-10 text-sm bg-white border rounded outline-none placeholder-blueGray-300 text-blueGray-600 border-blueGray-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <ErrorMessage name="username" />
                  <div className="relative flex flex-wrap items-stretch w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="relative w-full px-3 py-3 pl-10 pr-10 text-sm bg-white border rounded outline-none placeholder-blueGray-300 text-blueGray-600 border-blueGray-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <ErrorMessage name="password" />
                  <div>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-gray-700 uppercase transition-all duration-150 ease-linear border border-gray-700 rounded shadow active:bg-gray-700 hover:shadow-lg focus:outline-none"
                      type="submit"
                      /* onClick={() => setShowModal(false)}*/
                    >
                      Log In
                    </button>
                  </div>
                </Form>
              </Formik>
              <Formik
                initialValues={{ email: '', username: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                  username: Yup.string()
                    .min(4, 'Must be 4 characters or more')
                    .required('Required'),
                  password: Yup.string()
                    .min(8, 'Must be 8 characters or more')
                    .required('Required'),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  await handleSignUp(values);
                  setSubmitting(false);
                }}
              >
                <Form className="space-y-4 md:ml-3">
                  <div className="relative flex flex-wrap items-stretch w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="relative w-full px-3 py-3 pl-10 pr-10 text-sm bg-white border rounded outline-none placeholder-blueGray-300 text-blueGray-600 border-blueGray-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <ErrorMessage name="email" />
                  <div className="relative flex flex-wrap items-stretch w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Username"
                      className="relative w-full px-3 py-3 pl-10 pr-10 text-sm bg-white border rounded outline-none placeholder-blueGray-300 text-blueGray-600 border-blueGray-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <ErrorMessage name="username" />
                  <div className="relative flex flex-wrap items-stretch w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-blueGray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="relative w-full px-3 py-3 pl-10 pr-10 text-sm bg-white border rounded outline-none placeholder-blueGray-300 text-blueGray-600 border-blueGray-300 focus:outline-none focus:ring"
                    />
                  </div>
                  <ErrorMessage name="password" />
                  <div>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-700 rounded shadow outline-none active:bg-gray-700 hover:shadow-lg focus:outline-none"
                      type="submit"
                      /* onClick={() => setShowModal(false)}*/
                    >
                      Sign Up
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
            {/* Footer */}
            <div className="flex items-center p-1 border-t border-solid rounded-b border-blueGray-200">
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
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
  );
};

export default SignIn;
