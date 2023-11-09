"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import Link from "next/link";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


export default function Home() {


  const { getUserData } = useContext<any>(GlobalContext);

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [loading, setloading] = useState<boolean>(false);
  const [iCanSeePassword, setiCanSeePassword] = useState<boolean>(false);

  const router = useRouter();

  const login = async (e: any) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res.data);
      await getUserData();
      router.push("/");
      toast.success(res.data.message);

    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="h-screen md:p-32 flex items-center justify-center lg:justify-evenly">
      <div className="hidden lg:block">
        <Image
          src='https://cdn.dribbble.com/users/1127965/screenshots/3240034/media/f54b31283e36799dfb439b7a30795e23.gif'
          alt="Picture of the men waiting"
          width={500}
          height={500}
        />
      </div>
      <div className={`shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] max-w-xs rounded-md ${loading && 'pointer-events-none opacity-70'}`}>
        {loading && <BarLoader className="my-0.5" width={'100%'} color="#00BFFF" />}
        <h1 className="text-2xl font-semibold text-[#003B73] p-4 text-center">Log In</h1>
        <form className="px-6" onSubmit={login}>
          <input className="px-4 my-4 py-2 w-full focus:outline-0 border-b border-[#003B73] focus:border-b-2" type="email" placeholder="Email" onChange={(e) => setuser({ ...user, email: e.target.value })} />
          <div className="my-4 w-full relative">
            <input className="px-4 py-2 w-full border-b border-[#003B73] focus:border-b-2 focus:outline-0" type={iCanSeePassword ? "text" : "password"} placeholder="Password" onChange={(e) => setuser({ ...user, password: e.target.value })} />
            <div onClick={() => setiCanSeePassword(!iCanSeePassword)} className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-2">{iCanSeePassword ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
          </div>
          <button className="block mt-6 w-full text-center p-4 font-semibold rounded-md text-white bg-[#00BFFF] hover:bg-[#00bfffbb]" disabled={user.email.length === 0 || user.password.length === 0 || loading} onClick={login} type="submit">{loading ? "Loading..." : 'Login'}</button>
        </form>
        <p className="text-center w-full p-4">
          <Link className="text-center" href='/signup'>Don`&apos;`t have an account yet? <span className="text-blue-500 font-semibold">Sign Up</span></Link>
        </p>
      </div>
    </div>
  )
}
