"use client";

import Link from 'next/link';
import { useState, useContext } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '../context/context';
import toast from 'react-hot-toast';

const Navbar = () => {

    const router = useRouter();

    const { userData, getUserData } = useContext<any>(GlobalContext);

    const [toggleNav, settoggleNav] = useState<boolean>(false);

    const toggleNavbar = () => {
        settoggleNav(!toggleNav);
    }

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            console.log(res.data);
            router.push('/login');
            getUserData();
            toast.success(res.data.message)
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <header className='bg-gradient-to-r from-[#003B73] to-[#055C9D] w-full ease-in duration-300 fixed top-0 left-0 z-10'>
            <nav className='max-w-[1366px] mx-auto h-[80px] flex justify-between items-center py-3 px-10'>
                <div>
                    <Link href='/' onClick={()=>settoggleNav(false)}>
                        <span className='logo text-2xl lg:text-3xl md:text-2xl lg-text-3xl text-white font-semibold'>
                            PDF Modifier
                        </span>
                    </Link>
                </div>
                <div className='hidden md:flex gap-5'>
                    {userData === undefined ?
                        <div className='md:flex gap-5'>
                            <Link href='/login' className='rounded-full bg-white font-semibold text-[#003B73] px-4 py-1.5'>Log In</Link>
                            <Link href='/signup' className='rounded-full bg-[#00BFFF] font-semibold text-white px-4 py-1.5'>Sign Up</Link>
                        </div>
                        :
                        <div className='md:flex gap-5'>
                            <Link href='/myPdfs' className='text-white hover:border-b border-b-white p-1 font-semibold tracking-wide my-auto'>My PDFs</Link>
                            <button onClick={logout} className='rounded-full bg-[#00BFFF] font-semibold text-white px-4 py-1.5'>Log Out</button>
                        </div>
                    }
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleNavbar} className='text-white text-2xl'>
                        {toggleNav ? <AiOutlineClose /> : <AiOutlineMenu />}
                    </button>
                </div>
                <div className={toggleNav ?
                    'md:hidden absolute top-[80px] right-0 bottom-0 left-0 bg-gray-300 grid place-items-center h-screen w-full ease-in duration-300'
                    :
                    'md:hidden absolute top-[80px] left-[-100%] right-0 bottom-0 bg-gray-300 grid place-items-center h-screen w-full ease-out duration-300'
                }>
                    <div>
                        {userData === undefined ?
                            <div>
                                <Link onClick={toggleNavbar} href='/login' className='rounded-full bg-white font-semibold text-[#003B73] text-xl md:text-md px-4 py-1.5 block text-center my-2'>Log In</Link>
                                <Link onClick={toggleNavbar} href='/signup' className='rounded-full bg-[#00BFFF] font-semibold text-white text-xl md:text-md  px-4 py-1.5 block my-2'>Sign Up</Link>
                            </div>
                            :
                            <div className='text-center'>
                                <Link onClick={toggleNavbar} href='/myPdfs' className='rounded-full bg-white font-semibold text-[#003B73] text-xl md:text-md px-4 py-1.5 block text-center my-2'>PDFs</Link>
                                <button onClick={() => { toggleNavbar(); logout(); }} className='rounded-full bg-[#00BFFF] font-semibold text-white text-xl md:text-md  px-4 py-1.5 block my-2'>Log out</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
