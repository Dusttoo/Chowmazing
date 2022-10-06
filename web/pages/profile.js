const Profile = () => {
    return (
    //   <Layout>
        <h1>Your Profile</h1>
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