import Link from 'next/link'
import Image from 'next/image';
import { LoginButton } from '../components/loginButton'
import { LogoutButton } from '../components/logoutButton'

export const NavBar = ({user}) => {
    return (
        <div className='w-screen bg-white h-30 flex items-end justify-between p-2 text-main-1 font-bold'>
            <Link href='/'>
                <a>
                    <Image 
                    src='https://chowmazing.s3.us-east-2.amazonaws.com/ChowMazing+(3).png' 
                    width='150px'
                    height='150px'/>
                </a>
            </Link>
            
            <div>
                <Link href="/">
                    <a className='p-4'>Home</a>
                </Link>
                <Link href="/profile">
                    <a className='p-4'>Profile</a>
                </Link>
            </div>
            {!user ? <LoginButton /> : <LogoutButton/>}

        </div>
    )
  }