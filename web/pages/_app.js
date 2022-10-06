import 'tailwindcss/tailwind.css'
import { UserContext } from '../components/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter();
  const [publicRoute, setPublicRoute] = useState(false)
  const publicRoutes = ['signup', 'login', 'home']

  

  useEffect(() => {
      if(router.asPath.includes('signup')
      || router.asPath.includes('login')
      || router.asPath.includes('home')) {
        return
      }
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
        } else {
          router.push('auth/login');
        }
      }
      fetchUser()
  }, [])

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
