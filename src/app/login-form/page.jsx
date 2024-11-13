'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Signup = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
    const [existingUserData, setExistingUserData] = useState([]);

    useEffect(() => {
        const checkStoreUser = JSON.parse(localStorage.getItem('users')) ?? [];
        setExistingUserData(checkStoreUser);

    }, [userData])

    const handleInput = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value }); // {name: "valueXYZ"}
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", userData);
        if (existingUserData.email === userData.email) {
            alert('you Logged In successfully...')
            return;
        }

        setUserData({
            userName: '',
            email: '',
            phon: '',
            password: ''
        });

    };
    return (
        <div className=''>
            <div className='flex justify-center items-center w-[300px] mx-auto bg-green-600 rounded-xl py-10'>
                <form onSubmit={handleSignIn} className='flex flex-col gap-5'>
                    <p className='text-md rounded-xl font-semibold'>Please Fill this form to login</p>

                    <input onChange={handleInput}
                        value={userData.email}
                        type="email"
                        name='email'
                        className='text-black py-2 px-4 rounded-xl'
                        placeholder='Enter you email'
                        required />

                    <input onChange={handleInput}
                        value={userData.password}
                        type="text"
                        name='password'
                        className='text-black py-2 px-4 rounded-xl'
                        placeholder='password' required />

                    <button
                        type='submit'
                        className='shadow-xl bg-orange-500 hover:bg-orange-700 duration-200 active:scale-90 text-black rounded-xl py-2 '>
                        Login
                    </button>

                    <p>Don't yet Signed-UP / <Link href={'/signup-form'} className='text-black underline font-semibold'>Sign-up</Link></p>
                </form>
            </div>

        </div>
    )
}

export default Signup;