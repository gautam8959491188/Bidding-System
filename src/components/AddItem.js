
import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const AddItem = () => {

    const handelInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
          ...formData,
          [event.target.name]: value
         
        });
      };
    
      const handelFormSubmit = async (event) => {
        const {itemName, price, description, image} = formData;
        
        
          fetch("http://localhost:5000/addItem",{
            method:"POST",
            crossDomain: true,
            headers:{
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                itemName: itemName,
                price: price,
                description: description,
                image: image,
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data, "itemAdded");
            
        });
        
      
        event.preventDefault();
        alert("Item Added")

        fetch("http://localhost:5000/setInitialBid",{
          method:"POST",
          crossDomain: true,
          headers:{
              "Content-Type" : "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
              itemName: itemName,
              bidAmount: price,
              userName: "Admin",
              itemImage: image,
          })
      })
      .then((res)=>res.json())
      .then((data)=>{
          console.log(data, "initialBidAdded");  
      });
        window.location.href="./UserDetails"
        
    }
const [formData, setFormData] = useState({
    itemName: "",
    price: 0,
    description: "",
    image: "",
  });
  return (
    <div className='border border-gray-200 w-1/2 h-3/4 mt-32 shadow-xl bg-gradient-to-r from-green-100 ml-[370px]'>
     <form onSubmit={handelFormSubmit}> 
     <center><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white mt-2"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Add Item</span></h1></center>
        
        <span className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10">Item Name: </span>
      <input type='text'  onChange={handelInputChange} id='itemName' name='itemName' value={formData.itemName} className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current"  /><br />
      <span className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10">Item Price: </span>
      <input type='number' value={formData.price} id='price' name='price' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <span className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10">Description: </span>
      <input type='text' value={formData.description} id='description' name='description' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <span className="text-sm font-medium text-gray-900 left-44 ml-80 mt-10">Image URL: </span>
      <input type='text' value={formData.image} id='image' name='image' className="ml-24 block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-current" onChange={handelInputChange} /><br />
      <center><button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button></center>
    </form>
    <center><Link to="/UserDetails"><button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4">Home</button></Link></center>
    </div>
  )
}

export default AddItem
