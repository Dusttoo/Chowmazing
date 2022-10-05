import Head from 'next/head'
import { useState, useEffect } from 'react';

export default function Users() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);
      const json = await res.json();
      console.log(json)
      setUsers(json);
    }
    fetchUsers();
  }, [])

//   function handleChange(e) {
//     setNote(e.target.value);
//   }

  async function handleSubmit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    })
    const json = await res.json();
    setUsers([...users, json])
  }

  return (
    <div>
      <Head>
        <title>Users</title>
      </Head>
      <div className="container mx-auto p-10 m-10">
        <div className="flex flex-col">
          <h1 className="font-bold mb-3">Users</h1>
          <label>Username</label>
          <input 
          onChange={(e) => setUsername(e.target.value)}/>
           <label>Email</label>
          <input 
          onChange={(e) => setEmail(e.target.value)}/>
          <label>Password</label>
          <input 
          onChange={(e) => setPassword(e.target.value)}/>
         

          <div className="mx-auto p-3 m-5">
            <button onClick={handleSubmit} className="bg-green-500 p-3 text-white">Submit</button>
          </div>
          <div>
            <ul>
              {users && users.map((user) =>
                  <li key={user.id} className="bg-yellow-100 m-3 p-3 border-yellow-200 border-2">{user.username} {user.email}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}