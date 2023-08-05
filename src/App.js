
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [ users, setUsers] = useState([]);


  useEffect(()=>{
     fetch(`http://localhost:5000/users`)
    .then(res => res.json())
    .then(data =>{
      setUsers(data);
    })
  },[])


  const handleAddUser = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const mobile = form.mobile.value;
    const email = form.email.value;
    const user = {name, mobile, email};
    console.log(user);

    fetch(`http://localhost:5000/users`,{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)

    })
    .then(res =>res.json())
    .then(data =>{
      console.log(data)
      const newUser = [...users, data]
      setUsers(newUser);
      form.reset()
    })
  }

  return (
    <div className="App">
     <h2>User Management</h2>
     <p>Number of Users {users.length}</p>

     <form onSubmit={handleAddUser} >
      <input type="text" name="name" id="" />
      <br />
      <input type="text" name="mobile" id="" />
      <br />
      <input type="email" name="email" id="" />
      <br />
      <input type="submit" value="Add user" />
     </form>
    {
      users.map(user => <p> {user.id}:{user.name}: {user.email}: {user.mobile}</p>)
    }
    </div>
  );
}

export default App;
