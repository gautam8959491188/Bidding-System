import React, { useEffect, useState } from 'react'
import ShowDetails from './ShowDetails';
import AdminPanel from './AdminPanel';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../utils/userSlice';

const UserDetails = () => {
  const [userData, setUserData] = useState("");
      useEffect(()=>{
        fetch("http://localhost:5000/userData",{
          method:"POST",
          crossDomain: true,
          headers:{
              "Content-Type" : "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
           token: window.localStorage.getItem("token")
          })
      })
      .then((res)=>res.json())
      .then((data)=>{
          console.log(data, "userRegister");
          alert(data.data.userName);
          alert(data.data.email);
          setUserData(data.data); 
      });
    },[]);
;
    return (
    
    <div>
      {userData.UserType=="admin"?<AdminPanel />:<ShowDetails data={userData} />}
      
      
    </div>
  )
}

export default UserDetails
