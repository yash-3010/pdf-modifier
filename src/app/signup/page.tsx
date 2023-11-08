"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BarLoader } from "react-spinners";

interface User {
  name: string,
  email: string,
  password: string,
}

export default function Home() {

  const router = useRouter();

  const [user, setuser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState<boolean>(false);
  const [valid, setvalid] = useState<boolean>(false);
  const [iCanSeePassword, setiCanSeePassword] = useState<boolean>(false);

  useEffect(() => {
    if (user.name.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setvalid(true);
  } else {
    setvalid(false);
  }
  }, [user]);


const signup = async (e:any) => {
  e.preventDefault();
  try {
    setloading(true);
    const res = await axios.post("/api/users/signup", user);
    console.log(res.data);
    router.push("/login");
    toast.success(res.data.message);

  } catch (error:any) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally {
    setloading(false);
  }
}

return (
  <div className="h-screen md:p-32 flex justify-center items-center md:justify-evenly my-auto">
      <div className="hidden md:block">
        <Image
          src='https://cdn.dribbble.com/userupload/10797860/file/original-b8ae94f4ea7fac17591a67d32736d893.gif'
          alt="Picture of the men waiting"
          width={500}
          height={500}
        />
      </div>
      <div className={`shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] mx-3 md:mx-0 max-w-xs rounded-md ${loading && 'pointer-events-none opacity-70'}`}>
          {loading && <BarLoader className="my-0.5" width={'100%'} color="#00BFFF" />}
        <h1 className="text-2xl font-semibold text-[#003B73] p-4 text-center">Sign Up</h1>
        <form className="px-6" onSubmit={signup}>
          <input className="px-4 my-4 py-2 w-full focus:outline-0 border-b border-[#003B73] focus:border-b-2" type="text" placeholder="Name" value={user.name} onChange={(e) => setuser({ ...user, name: e.target.value })} />
          <input className="px-4 my-2 py-2 w-full focus:outline-0 border-b border-[#003B73] focus:border-b-2" type="email" placeholder="Email" onChange={(e) => setuser({ ...user, email: e.target.value })} />
          <div className="my-4 w-full relative">
            <input className="px-4 py-2 w-full border-b border-[#003B73] focus:border-b-2 focus:outline-0" type={iCanSeePassword ? "text" : "password"} placeholder="Password" onChange={(e) => setuser({ ...user, password: e.target.value })} />
            <div onClick={() => setiCanSeePassword(!iCanSeePassword)} className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-2">{iCanSeePassword ? <AiFillEyeInvisible /> : <AiFillEye />}</div>
          </div>
          <button className="block mt-4 w-full text-center p-4 font-semibold rounded-md text-white bg-[#00BFFF] hover:bg-[#00bfffbb]" disabled={user.email.length === 0 || user.password.length === 0 || user.name.length === 0} onClick={signup} type="submit">{loading ? "Loading..." : 'Sign Up'}</button>
        </form>
        <p className="text-center w-full p-4">
          <Link className="text-center" href='/login'>Alredy have an account? <span className="text-blue-500 font-semibold"> Log In</span></Link>
        </p>
      </div>
    </div>
)
}
