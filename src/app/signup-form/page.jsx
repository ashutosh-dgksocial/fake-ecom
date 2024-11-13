'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Signup = () => {
    const [userData, setUserData] = useState({ userName: '', email: '', phon: '', password: '' })
    const [initialUsers, setInitialUsers] = useState([]);
    const [storedUsers, setStoredUsers] = useState([]) // this will hold the local userrr


    useEffect(() => {
        if (initialUsers.length <= 0) { return }
        localStorage.setItem("users", JSON.stringify(initialUsers));

        const checkStoreUser = JSON.parse(localStorage.getItem('users')) ?? [];
        setStoredUsers(checkStoreUser);

        // console.log('initial array', initialUsers)
    }, [initialUsers])

    const handleInput = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value }); // {name: "valueXYZ"}
    }
    const handleSignIn = (e) => {
        e.preventDefault();
        // localStorage.setItem(`user-${userData.userName}`, JSON.stringify(userData))
        const checkUserExist = storedUsers.some((sameuser) => sameuser.email === userData.email);
        if (checkUserExist) {
            alert('Email already exists')
            return;
        }

        setInitialUsers([...initialUsers, userData]);


        // Resetting the input fields
        setUserData({
            userName: '',
            email: '',
            phon: '',
            password: ''
        });
        alert('you Signed In successfully')
    };


    return (
        <div className=''>
            <div className='flex justify-center items-center w-[300px] mx-auto bg-pink-700 rounded-xl py-10'>
                <form onSubmit={handleSignIn} className='flex flex-col gap-5'>
                    <p className='text-md rounded-xl font-semibold'>Please Fill this form to sign-up</p>
                    <input onChange={handleInput}
                        value={userData.userName}
                        type="text"
                        name='userName'
                        className='text-black py-2 px-4 rounded-xl'
                        placeholder='Enter your name'
                        required />
                    <input onChange={handleInput}
                        value={userData.email}
                        type="email"
                        name='email'
                        className='text-black py-2 px-4 rounded-xl'
                        placeholder='Enter you email'
                        required />
                    <input onChange={handleInput}
                        value={userData.phon}
                        type="text"
                        name='phon'
                        className='text-black py-2 px-4 rounded-xl'
                        placeholder='Enter your mobile number'
                        required />
                    <input onChange={handleInput}
                        value={userData.password}
                        type="password"
                        name='password'
                        className='text-black py-2 px-4 rounded-xl'
                        placeholder='password' required />

                    <button type='submit' className='shadow-xl bg-orange-500 hover:bg-orange-700 duration-200 active:scale-90 text-black rounded-xl py-2 '>SINGUP</button>
                    <p>Already Signed-UP / <Link href={'/login-form'} className='text-black underline font-semibold'>Login</Link></p>
                </form>
            </div>

        </div>
    )
}

export default Signup;