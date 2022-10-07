import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image';

export const NavBar = () => {
    return (
        <div className='w-screen bg-white h-30 flex items-end p-2 text-main-1 font-bold'>
            <Link href='/'>
                <a>
                    <Image 
                    src='https://top-notch.s3.us-east-2.amazonaws.com/ChowMazing.png' 
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
        </div>
    )
  }