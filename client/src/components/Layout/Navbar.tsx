/* eslint-disable no-alert */
import React from 'react';
import Link from 'next/link';
import SignIn from '../SignIn';
import Token from '../../service/token';
import Auth from '../../service/auth';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();

  let isLoggedIn = false;
  if (typeof window !== 'undefined') {
    isLoggedIn = Token.hasAuthToken();
  }

  const logout = () => {
    Token.clearAuthToken();
    window.setTimeout(() => router.push(`/`), 500);
  };

  const username = Auth.getUsername();

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-2 bg-gray-700 shadow-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a className="inline-block py-2 mr-4 text-lg font-bold leading-relaxed text-white uppercase whitespace-nowrap hover:no-underline">
                KEYBOUND
              </a>
            </Link>
            <button
              className="block px-3 py-1 text-xl leading-none text-white bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
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
              (navbarOpen ? 'flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="mr-3 nav-item">
                <Link href="/sheets">
                  <a className="hover:no-underline">
                    <button
                      className="flex items-center px-3 py-2 text-xs text-base font-bold leading-snug text-white transition duration-500 ease-in-out border-b-2 border-white border-opacity-0 hover:border-green-300 focus:outline-none"
                      type="button"
                    >
                      View All
                    </button>
                  </a>
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="mr-3 nav-item">
                    <Link href="/">
                      <a className="hover:no-underline">
                        <button
                          className="flex items-center px-3 py-2 text-xs text-base font-bold leading-snug text-white transition duration-500 ease-in-out border-b-2 border-white border-opacity-0 hover:border-green-300 focus:outline-none"
                          type="button"
                        >
                          Favorites
                        </button>
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="flex items-center px-2 py-2 text-xs text-base font-bold leading-snug text-white transition duration-500 ease-in-out border-b-2 border-white border-opacity-0 hover:border-green-300 focus:outline-none"
                      type="button"
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="flex items-center py-2 text-xs text-base font-bold leading-snug text-green-300 nav-item md:px-2">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <p className="ml-1">{username}</p>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="flex items-center px-2 py-2 text-xs text-base font-bold leading-snug text-white transition duration-500 ease-in-out border-b-2 border-white border-opacity-0 hover:border-green-300 focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    LOGIN / Sign up
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal*/}

      {showModal ? <SignIn setShowModal={setShowModal} /> : null}
    </>
  );
}
