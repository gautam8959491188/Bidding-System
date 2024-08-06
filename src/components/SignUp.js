import React, { useState } from 'react'


const SignUp = () => {

const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    UserType: "",
  });
  const [secretKey, setSecretKey] = useState("")
const handelInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
     
    });
  };
const handelFormSubmit = async (event) => {
    const {userName, email, password, UserType} = formData;
    console.log(UserType);
    if(UserType=="admin" && secretKey!="Gautam_A")
    {
      alert("Invalid Secret Key");

    }else{
      fetch("http://localhost:5000/register",{
        method:"POST",
        crossDomain: true,
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
            UserType: UserType,
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("Status: " +data.status+", User has been created.");
        window.location.href="/"
    });
    }
  
    event.preventDefault();
    
}
  return (
    <div className='border border-gray-200 w-1/2 h-3/4 mt-32 shadow-xl bg-gradient-to-r from-green-100 ml-72'>
    <form onSubmit={handelFormSubmit}> 
        <u><center><h1 className='font font-bold'>SignUp Page<br /></h1></center></u>
        <label>Register As: </label>
        <div> 
          User <input type='radio' id="UserType" name='UserType' value="user" onChange={handelInputChange} />
          Admin <input type='radio' id="UserType" name='UserType' value="admin" onChange={handelInputChange} />
        </div>
        {
          formData.UserType=="admin"?<div><span className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10">Secret Key: </span>
          <input type='password' name="secret_key" value={secretKey} onChange={(e)=>{setSecretKey(e.target.value)}} className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current"/><br /></div>:null
        }
        
        
        <span className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10">User Name: </span><br />  
      <input type='text'  onChange={handelInputChange} id='userName' name='userName' value={formData.userName} className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current"  /><br />
      <span className="text-sm font-medium text-gray-900 left-44 ml-[340px] mt-10">Email: </span>
      <input type='text' value={formData.email} id='email' name='email' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <span className="text-sm font-medium text-gray-900 left-44 ml-[330px] mt-10">Password: </span>
      <input type='password' value={formData.password} id='password' name='password' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <button className='cursor-pointer bg-green-100 p-2 m-2 ml-[330px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold p-2 mt-3 rounded'>Submit</button>
    </form>
    </div>
  )
}

export default SignUp
