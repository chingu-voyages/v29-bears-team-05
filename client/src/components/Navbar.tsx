import React from 'react';

export default function Navbar() {

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);

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
                                <button className="text-sm px-3 py-2 flex items-center text-xs leading-snug text-gray-700 hover:opacity-75 focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="text-base px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75 focus:outline-none"
                                >
                                    Login
                                </button> 
                            </li>
                        </ul>
                    </div> 
                </div>
            </nav>
        </>
    ); 
}



