import { useEffect, useState } from "react";
import React from 'react'
import CartCard from "./CartCard";

const CartSection = ({data}) => {
    const [winnerData, setWinnerData] = useState([]);
    const [showSection, setShowSection] = useState(false);
    //alert(data.userName);
useEffect(()=>{
    console.log("Inside useEffect.")
    fetch("http://localhost:5000/getWinner",{
        method:"POST",
        crossDomain: true,
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            userName: data.userName
        })
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data, "WinnerDataInCart");
      window.localStorage.setItem("winnerItemList", data.data);
      const winnerList = window.localStorage.getItem("winnerItemList");
      console.log(winnerList);
    })
},[])
  
        

   




  return (
    <div>
     {
        //showSection? <h1>Cart is empty</h1> : <CartCard data={winnerData} />
     }
    </div>
  )
}

export default CartSection
