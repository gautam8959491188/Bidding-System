import React from 'react'
import logo from './assets/man.png'
const UserCard = ({data}) => {
    const deleteUser = (id,userName) =>{
            if(window.confirm(`Are You Sure you want to delete ${userName}`))
            {
                fetch("http://localhost:5000/deleteUser",{
                    method:"POST",
                    crossDomain: true,
                    headers:{
                        "Content-Type" : "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                    userid: id,     
                    })
                })
                .then((res)=>res.json())
                .then((data)=>{
                  alert(data.data);
                  window.location.href='./UserList';
                   
                });
            }else{

            }
    }
  return (
    <div className='mt-4'>
        <div className='shadow-slate-700 shadow-sm rounded-lg p-5 h-auto w-auto mx-5 border border-black mt-4'>
      <img src={logo} className='w-10 h-10'/>
      <h1 className='font-bold'>User Name: {data.userName}</h1>
      <h1 >Email: {data.email}</h1>
      <h1>Password: {data.password}</h1>
      <button type="button" onClick={()=>{deleteUser(data._id, data.userName)}} class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
      
      </div>
    </div>
  )
}

export default UserCard