import { LogoutButton } from "../components/logoutButton"

const Profile = () => {
    return (
    <div>
      <div className="mx-auto object-center w-screen h-screen flex flex-col items-center py-16 px-8 sm:px-6 lg:px-8">
        <h1>Your Profile</h1>
        <LogoutButton />    
      </div>
    </div>
    
        
    )
  }
  
  export default Profile