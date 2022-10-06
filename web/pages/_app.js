import 'tailwindcss/tailwind.css'
import { UserContext } from '../components/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    async function fetchUser() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("response ", res)
      if (res.status == 200) {
        const json = await res.json();
        setUser(json);
      } else {
        router.push('auth/login');
      }
    }
    fetchUser()
  }, [])

  console.log(user)
  if (pageProps.protected && !user) {
    return <h1>Loading...</h1>
  }

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
