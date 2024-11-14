'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Signup = () => {
    const [userData, setUserData] = useState({ userName: '', email: '', phon: '', password: '' });
    const [storedUsers, setStoredUsers] = useState([]); // This will hold the local users
    const router = useRouter();

    useEffect(() => {
        // Load existing users from localStorage when the component mounts
        const checkStoreUser = JSON.parse(localStorage.getItem('users')) ?? [];
        setStoredUsers(checkStoreUser);
    }, []);

    const handleInput = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        // Check if the user already exists
        const userExists = storedUsers.some((sameuser) => sameuser.email === userData.email);
        if (userExists) {
            alert('Email already exists');
            return;
        }

        
        // Add new user to local storage
        const updatedUsers = [...storedUsers, userData];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setStoredUsers(updatedUsers);

        // Resetting the input fields
        setUserData({
            userName: '',
            email: '',
            phon: '',
            password: ''
        });
        
        alert('You signed up successfully');
        // Uncomment the line below to redirect after signup
        router.push('/login-form');
    };

    return (
        <div className=''>
            <div className='flex justify-center items-center w-[300px] mx-auto bg-pink-700 rounded-xl py-10'>
                <form onSubmit={handleSignIn} className='flex flex-col gap-5'>
                    <p className='text-md rounded-xl font-semibold'>Please fill this form to sign-up</p>
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
                        placeholder='Enter your email'
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
                        placeholder='Password' required />

                    <button type='submit' className='shadow-xl bg-orange-500 hover:bg-orange-700 duration-200 active:scale-90 text-black rounded-xl py-2 '>SIGNUP</button>
                    <p>Already signed up? / <Link href={'/login-form'} className='text-black underline font-semibold'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;