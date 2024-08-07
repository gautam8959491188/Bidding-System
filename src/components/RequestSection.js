import React, { useEffect } from 'react'
import { useState } from 'react'
import NoBid from './NoBid';
import ShowInfo from './ShowInfo';


const RequestSection = ({data}) => {
    const [itemInfo, setitemInfo] = useState([])
    const [showMessage, setShowMessage] = useState(false);
    useEffect(()=>{
       getAllRequest();     
    },[])
    

   

    const getAllRequest = async () =>{       
         fetch("http://localhost:5000/getAllRequest",{
          method:"POST",
          crossDomain: true,
          headers:{
              "Content-Type" : "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
          userEmail: data.email,     
          })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data, "requestedData");
        if(data.data == null)
        {
          setShowMessage(true);
          alert("inside if")
          return;
        }
        const item = data.data.itemName;
        window.localStorage.setItem("item",item);
      }).then(()=>{

    const item = window.localStorage.getItem("item");
    console.log("Item from another function: "+ item);

    fetch("http://localhost:5000/requestedItemInfo",{
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
    console.log(data, "requestedItemInfoInside");
    setitemInfo(data.data)
    
 });


      })
      
      
   }



  return (
    <div>
{
  showMessage? <NoBid /> : <ShowInfo itemInfo={itemInfo} />
}
</div>

  
  )
}

export default RequestSection
