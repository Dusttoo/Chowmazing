import 'tailwindcss/tailwind.css'
import { UserContext } from '../components/user'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Layout from '../components/layout';



function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const router = useRouter();

  useEffect(() => {
      if(router.asPath.includes('signup')
      || router.asPath.includes('login')
      || router.asPath === '/') {
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
  }, [router.asPath])

  if (pageProps.protected && !user) {
    return <h1>Loading...</h1>
  }

  return (
    <UserContext.Provider value={user}>
      {router.asPath.includes('signup') ? <Component {...pageProps} /> : 
      router.asPath.includes('login') ? <Component {...pageProps} /> : 
      <Layout>
        <Component {...pageProps} />
      </Layout>
      }
      
    </UserContext.Provider>
  )
}

export default MyApp
