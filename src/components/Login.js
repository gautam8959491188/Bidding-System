import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../utils/userSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const handelInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
     
    });
  };
const handelFormSubmit = async (event) => {
    const {email, password} = formData;
    fetch("http://localhost:5000/login-user",{
        method:"POST",
        crossDomain: true,
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data, "userLogin");
        if(data.status=="Ok")
        {
          alert("Login Successful.");
          window.localStorage.setItem("token", data.data)
          window.location.href='./UserDetails';
        }
    });
    
    event.preventDefault();
  }
  return (
   
    <form onSubmit={handelFormSubmit}>
       <div className='border border-gray-200 w-1/2 h-3/4 mt-32 shadow-xl bg-gradient-to-r from-green-100 ml-[370px]'>
       <img src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png" className='h-24 border rounded-full mt-3 ml-72'/>
       <div className="mt-2  gap-x-6 gap-y-8 sm:grid-cols-6">
       <label htmlFor="email" className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10"> 
       Email: <span className='text-red-600'>*</span>
       </label>
      <input type='text' value={formData.email} id='email' name='email' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <label className='space-y-40 ml-[305px]'>Password: </label> <span className='text-red-600'>*</span>
      <input type='password' value={formData.password} id='password' name='password' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <button className="ml-[315px] bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold p-2 mt-3 rounded">Log In</button>
      <div className='mt-10'>
              <span className='ml-60'>Dont have an account..?</span><a href='/' className='text-blue-600 font-bold ml-3'><Link to="/SignUp">Sign Up</Link></a>
            </div>
      </div>
      </div>
    </form>
    
  )
}

export default Login;
