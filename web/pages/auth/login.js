import { useState } from 'react';
import { useRouter } from 'next/router';
import { LogoutButton } from '../../components/logoutButton';
import Image from 'next/image';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
      method: 'POST',
      body: formData
    });
    if (res.status == 200) {
      const json = await res.json();
      localStorage.setItem('token', json.access_token);
      router.push("/profile");
    } else {
      alert('Login failed.')
    }
  }

  return (
      <div className="mx-auto object-center w-screen h-screen flex flex-col items-center justify-center py-16 px-8 sm:px-6 lg:px-8 bg-main-1">
        <Image 
        src='https://top-notch.s3.us-east-2.amazonaws.com/ChowMazing+(2).png' 
        width='250px'
        height='250px'

        />
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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
                  onChange={handleUsernameChange}
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
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-white focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-main-2">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="text-sm">
                <a href="/auth/signup" className="font-medium text-white hover:text-main-2">
                  No account? Sign up.
                </a>
              </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-white hover:bg-main-1 hover:border-solid border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-2 text-main-1"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}