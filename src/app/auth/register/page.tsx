"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast";

const Register = () => { 
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast();
  
   const handleSubmit = async (e: any) => { 
    e.preventDefault()
    try {
     const respones = await axios.post("http://localhost:1337/api/auth/local/register", {
      username,
      email,
      password
    })
    toast({
      title: "Registrasion Success",
      description: "Just Now, You has been registred",
    })
    window.location.href = '/auth/login'
    } catch (error: any) {
      if (error.respones && error.respones.data.message[0].messages[0].id === "Auth.form.error.email.taken") {
        toast({ variant: "destructive", title: "Email already exists" })
      } else {
        toast({ variant: "destructive", title: "Register Failed" })
      }
    }
   }


  return (
    <div className='p-16 mx-14'>
      <section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt=""
        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover"
        width={600}
      height={600}
      />
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <Link className="block font-bold text-2xl text-blue-600" href="/auth/login">
          <h2>Sportyz</h2>
        </Link>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome to Sportyz <span className="text-blue-600">!</span>
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Please register your account for shopping from Sportyz
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={username}
              className="mt-1 w-full h-10 rounded-md outline-none border-gray-200 bg-white text-sm text-gray-700 shadow-xl"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full h-10 outline-none  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xl"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full h-10 outline-none rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xl"
            />
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
            type="submit"
            disabled={!(username || email || password)}
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link href="/auth/login" className="text-gray-700 underline">Log in</Link>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
    </div>
  )
}

export default Register