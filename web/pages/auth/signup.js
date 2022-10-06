import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogoutButton } from '../../components/logoutButton';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit() {
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
    if (res.status == 201) {
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
        <title>Users</title>
      </Head>
      <div className="container mx-auto p-10 m-10">
        <LogoutButton />
        <div className="flex flex-col">
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
        </div>
      </div>
    </div>
  )
}