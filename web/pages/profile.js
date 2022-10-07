import { LogoutButton } from "../components/logoutButton"
import { useState, useEffect } from "react"

const Profile = ({user}) => {
  console.log(user)
  if(!user) return
    return (
    <div>
      <div className="mx-auto object-center w-screen h-screen flex flex-col items-center py-16 px-8 sm:px-6 lg:px-8">
        <h1 className='bg-main-1 text-white px-4 rounded-lg'>Your Profile</h1>
        <h3 className='bg-main-1 text-white px-4 rounded-lg'>First Name:</h3>
        <p className='bg-main-1 text-white px-4 rounded-lg'>{user.first_name}</p>
        <h3 className='bg-main-1 text-white px-4 rounded-lg'>Last Name:</h3>
        <p className='bg-main-1 text-white px-4 rounded-lg'>{user.last_name}</p>
        <h3 className='bg-main-1 text-white px-4 rounded-lg'>Birthdate:</h3>
        <p className='bg-main-1 text-white px-4 rounded-lg'>{user.birthdate}</p>
        <h3 className='bg-main-1 text-white px-4 rounded-lg'>Address:</h3>
        <p className='bg-main-1 text-white px-4 rounded-lg'>{user.address.street1} {user.address.street2 && user.address.street2} {user.address.city} {user.address.state} {user.address.zip}</p>
        <LogoutButton />    
      </div>
    </div>
    
        
    )
  }
  
  export default Profile