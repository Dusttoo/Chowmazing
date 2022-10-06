import { useRouter } from 'next/router';

export const LoginButton = () => {
    const router = useRouter()
    return <button
    className='bg-main-1 text-white px-4 rounded-lg'
    onClick={() => router.push('/auth/login')}>Login</button>
  }