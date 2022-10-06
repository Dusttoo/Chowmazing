import { LogoutButton } from "../components/logoutButton"

const Profile = () => {
    return (
    //   <Layout>
    <div>
      <h1>Your Profile</h1>
      <LogoutButton />    
    </div>
        
    //   </Layout>
    )
  }
  
  export async function getStaticProps(context) {
    return {
      props: {
        protected: true,
      },
    }
  }
  
  export default Profile