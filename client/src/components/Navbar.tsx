import React from 'react';

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
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">        
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/* Content */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h4 className="text-2xl font-semibold">
                                    Log In or Sign Up!
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
                                <div className="space-y-4">
                                    <input type="text" placeholder="Username" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <input type="password" placeholder="Password" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <button
                                        className="bg-gray-500 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Log In
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <input type="email" placeholder="Email" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <input type="text" placeholder="Username" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <input type="password" placeholder="Password" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pr-10"/>
                                    <button
                                        className="bg-gray-500 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Sign Up
                                    </button>
                                </div>
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



