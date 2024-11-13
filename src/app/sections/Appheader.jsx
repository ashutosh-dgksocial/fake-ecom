"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Signup from "../signup-form/page";
import Login from "../login-form/page";

function AppHeader() {
    const [navOpen, setNavOpen] = useState(false);
    // const {user, logout} = useAuth();
    // const [itemCount, setItemCount] = useState(0);
    // useEffect(() => {
    //     const cartCount = localStorage.getItem('cartCount') ?? 0;
    //     setItemCount(cartCount);
    // })
    const user = false;
    return (
        <header>
            <nav className="bg-white shadow-lg">
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        {user ? (
                            <>
                                <span className="p-4 shadow text-green-500">welcome | #user!</span>
                                <button className="text-black border-2 py-1 px-4 hover:bg-black hover:text-white active:scale-90 duration-200 ml-4 ">Logout</button>

                            </>) :

                            (
                                <>
                                   <div className="flex gap-2">
                                   <Link href="/signup-form" className="text-xl font-bold text-black hover:text-red-500">
                                        Signup 
                                    </Link>
                                    <span className="text-black">|</span>
                                    <Link href="login-form" className="text-xl font-bold text-red-500  hover:text-red-500 hover:underline">
                                        Login
                                    </Link>
                                   </div>
                                </>
                            )
                        }


                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                        <a href="#" className="text-gray-700 hover:text-blue-500">page2</a>
                        <a href="#" className="text-gray-700 hover:text-blue-500">page3</a>
                        <a href="#" className="text-gray-700 hover:text-blue-500">page4</a>
                    </div>
                    <Link href={'./cart'} className="rounded-[2px] hover:text-white text-black px-4 p-2 border cursor-pointer border-black hover:bg-blue-500 hover:border-white duration-300">
                        Cart
                        {/* ({itemCount}) */}
                    </Link>
                    <div className="md:hidden">
                        <button onClick={() => setNavOpen(!navOpen)} className="focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
                {navOpen && (
                    <div className="md:hidden">
                        <div className="flex flex-col space-y-2 px-4 py-2 bg-gray-100">
                            <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                            <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
                            <a href="#" className="text-gray-700 hover:text-blue-500">Services</a>
                            <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
                        </div>
                    </div>
                )}
            </nav>
        </header >
    );
}

export default AppHeader;