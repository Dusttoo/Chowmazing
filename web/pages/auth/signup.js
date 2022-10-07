import Head from 'next/head'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  console.log(birthdate)
  console.log({
    username: username,
    password: password,
    email: email,
    first_name: firstName,
    last_name: lastName,
    birthdate: new Date(birthdate),
    address: {
        street1: street1,
        street2: street2,
        city: city,
        state: state,
        zip: zip,
  }
})
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate,
        address: {
            street1: street1,
            street2: street2,
            city: city,
            state: state,
            zip: zip,
      }
    })
    })
    if (res.status == 201 || res.status == 200) {
      const json = await res.json();
      localStorage.setItem('token', json.access_token);
      router.push("/profile");
    } else {
      alert('Sign Up failed.')
    }
  }

//   {
//     'id': db_user.id,
//     'username': db_user.username, 
//     'hashed_password': password_hash, 
//     'email': db_user.email,
//     'first_name': db_user.first_name,
//     'last_name': db_user.last_name,
//     'birthdate': db_user.birthdate,
//     'address': {
//         'id': address.id,
//         'street1': address.street1,
//         'street2': address.street2,
//         'city': address.city,
//         'state': address.state,
//         'zip': address.zip
//     }
// }

  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="mx-auto object-center w-screen h-screen flex flex-col items-center justify-center py-16 px-8 sm:px-6 lg:px-8 bg-main-1">
        <Image 
        src='https://top-notch.s3.us-east-2.amazonaws.com/ChowMazing+(2).png' 
        width='250px'
        height='250px'

        />
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign up for a new account</h2>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthdate" className="sr-only">
                  birthdate
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  autoComplete="birthdate"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="birthdate"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="street1" className="sr-only">
                  Street Address
                </label>
                <input
                  id="street1"
                  name="street1"
                  type="text"
                  autoComplete="street1"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Street Address"
                  value={street1}
                  onChange={(e) => setStreet1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="street2" className="sr-only">
                  Street Address 2
                </label>
                <input
                  id="street2"
                  name="street2"
                  type="text"
                  autoComplete="street2"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Street Address 2 (optional)"
                  value={street2}
                  onChange={(e) => setStreet2(e.target.value)}
                />
              </div>
              <div className='flex justify-center'>
                <div>
                  <label htmlFor="city" className="sr-only">
                  City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="city"
                    required
                    className="appearance-none rounded-none w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="sr-only">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    autoComplete="state"
                    required
                    className="appearance-none rounded-none w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="sr-only">
                    Zip
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    autoComplete="zip"
                    required
                    className="appearance-none rounded-none w-full px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="text-sm">
                <a href="/auth/login" className="font-medium text-white hover:text-main-2">
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
      </div>
    </div>
    </div>
  )
}