import Head from 'next/head'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogoutButton } from '../../components/logoutButton';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit() {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    })
    if (res.status == 201 || res.status == 200) {
      const json = await res.json();
      localStorage.setItem('token', json.access_token);
      router.push("/profile");
    } else {
      alert('Login failed.')
    }
  }

  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="h-full flex-col items-center justify-center py-16 px-8 sm:px-6 lg:px-8 bg-main-1">
        <LogoutButton />
        <Image 
        src='https://top-notch.s3.us-east-2.amazonaws.com/ChowMazing+(2).png' 
        width='250px'
        height='250px'

        />
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" action="/" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="text-sm">
                <a href="/auth/login" className="font-medium text-white hover:text-indigo-500">
                  Have an account? Sign in.
                </a>
              </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-white hover:bg-main-1 hover:border-solid border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-2 text-main-1"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                </span>
                Sign Up
              </button>
            </div>
          </form>
        {/* <div className="flex flex-col">
          <h1 className="font-bold mb-3">Users</h1>
          <label>Username</label>
          <input 
          onChange={(e) => setUsername(e.target.value)}/>
           <label>Email</label>
          <input 
          onChange={(e) => setEmail(e.target.value)}/>
          <label>Password</label>
          <input 
          onChange={(e) => setPassword(e.target.value)}/>
         

          <div className="mx-auto p-3 m-5">
            <button onClick={handleSubmit} className="bg-green-500 p-3 text-white">Submit</button>
          </div>
        </div> */}
      </div>
    </div>
    </div>
  )
}