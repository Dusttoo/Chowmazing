import { useRouter } from 'next/router';

export const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/auth/login')
    }
    return <button
    className='bg-main-1 text-white px-4 rounded-lg hover:text-main-1 hover:bg-white'
    onClick={() => handleLogout()}>Logout</button>
  }