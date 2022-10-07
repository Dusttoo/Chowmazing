import Head from 'next/head'
import { useEffect, useState } from 'react'
import { LoginButton } from '../components/loginButton'
import { LogoutButton } from '../components/logoutButton'

export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(()=> {
    const token = localStorage.getItem('token');
      async function fetchUser() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.status == 200 || res.status == 201) {
          const json = await res.json();
          setUser(json);
        }
      }
      fetchUser()
  }, [])
  return (
    <div className="mx-auto p-10 m-10">
      <Head>
        <title>Chowmazing</title>
        <meta name="Chowmazing" content="It's what's for dinner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto p-10 m-10">
      {!user ? <LoginButton /> : <LogoutButton/>}
        <h1 className="p-4">
          Welcome to Chowmazing!!
        </h1>

      </main>
    </div>
  )
}