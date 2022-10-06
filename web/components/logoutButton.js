import { useRouter } from 'next/router';

export const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/home')
    }
    return <button
    onClick={() => handleLogout()}>Logout</button>
  }