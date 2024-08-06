import React from 'react'
import { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { Link } from 'react-router-dom';

const UserList = () => {
   
const [userData, setUserData] = useState([]);
useEffect(()=>{
getAllUser();
},[]);
const getAllUser = () => {
   
    fetch("http://localhost:5000/getAllUser",{
        method:"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data, "userData");
        setUserData(data.data);
    });
}
  return (
    <div>
     <center><h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 p-2">User's List</span></h1></center>
     <Link to="/UserDetails"><button className="ml-5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4">Home</button></Link>

{
userData.map(data=> <UserCard data={data} />)
}

<center><Link to="/UserDetails"><button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4">Home</button></Link></center>

    </div>
  )
}

export default UserList
