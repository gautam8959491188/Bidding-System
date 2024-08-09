import React, { useEffect, useState } from 'react'

const ShowResults = () => {
    const item = window.localStorage.getItem("winningItem");
    const [winner, setWinner] = useState({})
    console.log(item);
    useEffect(()=>{
    getWinner()
    },[])

    const getWinner = () => {
        fetch("http://localhost:5000/getWinningItem",{
            method:"POST",
            crossDomain: true,
            headers:{
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
            itemName:  item,   
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
          console.log(data, "largetBiddedItemData");
          setWinner(data.data);
          alert(data.data.userName)
          fetch("http://localhost:5000/setWinner",{
            method:"POST",
            crossDomain: true,
            headers:{
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
            itemName:  data.data.itemName,
            userName: data.data.userName,
            bidAmmount: data.data.bidAmmount,
            itemImage:  data.data.itemImage
            })
        }).then((res)=>res.json())
        .then((data)=>{
          console.log(data, "WinnerData");
        })
         });




       
    }
  return (
    <div>
      <h1>Congrtulations......</h1>
      <img src={winner.itemImage} className='h-24'/>
      <h1>Winner Name: {winner.userName}</h1>
      <h1>Winning Item: {winner.itemName}</h1>
      <h1>Bidded Amount: {winner.bidAmount}</h1>
    </div>
  )
}

export default ShowResults
