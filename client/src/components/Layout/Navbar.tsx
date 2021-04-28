/* eslint-disable no-alert */
import React from 'react';
import SignIn from '../SignIn';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 border-b border-gray">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="inline-block py-2 mr-4 text-lg font-bold leading-relaxed text-gray-700 uppercase whitespace-nowrap hover:no-underline"
              href="/"
            >
              KEYBOUND
            </a>
            <button
              className="block px-3 py-1 text-xl leading-none text-gray-700 bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="nav-item">
                <button
                  className="flex items-center px-3 py-2 text-xs text-base font-bold leading-snug text-gray-700 hover:opacity-75 focus:outline-none"
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

      {/* Login Modal*/}

      {showModal ? <SignIn setShowModal={setShowModal} /> : null}
    </>
  );
}
