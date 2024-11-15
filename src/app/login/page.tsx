'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data)
      toast.success("Login Success")
      router.push("/profile")
    } catch (error: any) {
      // Check for specific error message
      if (error.response && error.response.data.error) {
        if (error.response.data.error === "Please verify your email before logging in.") {
          toast.error("Please verify your email before logging in.");
        } else {
          toast.error(error.response.data.error);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-xl">
        <div className="p-8 bg-zinc-950 text-white">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <div>
              <input
                className="w-full px-3 py-2 bg-white text-black rounded"
                id="email"
                placeholder="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                className="w-full px-3 py-2 bg-white text-black rounded"
                placeholder="Password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              type="submit"
              onClick={onLogin}
            >
              Login
            </button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-gray-400">Or</span>
              </div>
            </div>
            <div className="space-y-3">
              <button
                className="w-full bg-white text-black hover:bg-gray-100 font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
                type="button"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
            <div className="text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-orange-600 hover:underline">
                SignUp
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-8 flex items-center justify-center">
          <div className="relative w-64 h-64 ">
            <Image
              src="/logocat.png"
              alt="Cool cat with laptop"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}