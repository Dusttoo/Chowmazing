const Profile = ({user}) => {
  if(!user) return
    return (
    <div>
      <div className="mx-auto object-center w-screen h-screen flex flex-col items-center py-16 px-8 sm:px-6 lg:px-8">
        <h1 className='mt-6 text-center text-3xl font-extrabold text-white pb-6'>Welcome, {user.first_name} {user.last_name}</h1>
        <div className="flex">
          <div>
          <h2 className="text-white px-4 text-2xl">Your Details</h2>
          <p className='text-white px-4'>Birthdate: {user.birthdate}</p>
          <p className='text-white px-4'>
            Address: {user.address.street1} {user.address.street2 && user.address.street2} {user.address.city} {user.address.state} {user.address.zip}</p> 
          </div>
          <div>
            <h2 className="text-white px-4 text-2xl">Recent Orders/Recipes</h2>
          </div>
        </div>  
      </div>
    </div>
    
        
    )
  }
  
  export default Profile