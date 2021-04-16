import React from 'react';

export default function Navbar({ fixed }) {

    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);

    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3 border-b border-gray">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a className="text-base font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-700"  href="/">
                            KEYBOUND
                        </a>
                        <button className="text-gray-700 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button" onClick={() => setNavbarOpen(!navbarOpen)}>
                            <i className="fas fa-bars"></i>
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
                                <button className="text-sm px-3 py-2 flex items-center text-xs leading-snug text-gray-700 hover:opacity-75"
                                >
                                    Sign Up
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="text-sm px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-gray-700 hover:opacity-75"
                                >
                                    Log In
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    ); 
}



