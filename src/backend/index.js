const express = require("express")
const app = express();
app.use(express.json())
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const JWT_SECRET = "dsjhfsdf23429879wfjsldkf(_+(987631" 
const bcrypt = require("bcryptjs");

app.use(cors());

const mongoURL = "mongodb+srv://gautamupadhyay142000:8959491188@cluster0.otvloda.mongodb.net/"
mongoose.connect(mongoURL).then(()=>{console.log("Connect to database.");})
.catch((e)=>{console.log(e)})


app.listen(5000, ()=>{
    console.log("Server Started.")
})



require("./userDetails");
require("./itemDetails");
require("./bidDetails");
const Item = mongoose.model("ItemInfo");
const User = mongoose.model("UserInfo");
const Bid = mongoose.model("BidInfo")

app.post("/register",async(req,res)=>{
    const {userName,email,password, UserType} = req.body;
    const oldUser = await User.findOne({ userName });
    const encryptedPassword = await bcrypt.hash(password,10)
    try {
        if(oldUser)
        {
            return res.json({error: "Uesr already exists."})
        }
        await User.create({
            userName: userName,
            email: email,
            password: encryptedPassword,
            UserType: UserType,
        })
        res.send({status: "Ok"});
    } catch (error) {
        res.send({status: error})
    }
})

app.post("/login-user",async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user)
        {
            return res.json({error: "Uesr not found."})
        }
   if(await bcrypt.compare(password, user.password))
   {
    const token = jwt.sign({email: user.email}, JWT_SECRET);

    if(res.status(201)){
        return res.json({status : "Ok", data: token});
    } else{
    return res.json({status: "error"})
    }
   }
   res.json({status: "error", error: "Invalid Password"});
})

app.post("/userData",(req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const userEmail = user.email;
        User.findOne({email: userEmail}).then((data)=>{
            res.send({status: "Ok", data: data})
        }).catch((error)=>{
            res.send({status: "error", data: error})
        })
    } catch (error) {

        
    }
})

app.get("/getAllUser",async (req,res)=>{
    try {
        const allUser = await User.find({});
        res.send({status: "Ok", data: allUser});
    
    } catch (error) {
        console.log(error)
    }
})

app.post("/deleteUser",async (req,res)=>{
    const { userid } = await req.body;
    console.log(userid)
    try {
       await User.deleteOne(
        {_id: userid}
    )
       res.send({status: "Ok", data: "Deleted"})
    } catch (error) {
        console.log(error)
    }
})


app.post("/addItem",async(req,res)=>{
    const {itemName,price,description, image} = req.body;
    try {

        await Item.create({
            itemName: itemName,
            price: price,
            description: description,
            image: image,
        })
        res.send({status: "Ok"});
    } catch (error) {
        res.send({status: error})
    }
})

app.get("/getAllItem",async (req,res)=>{
    try {
        const allItem = await Item.find({});
        res.send({status: "Ok", data: allItem});
    
    } catch (error) {
        console.log(error)
    }
})

app.post("/deleteItem",async (req,res)=>{
    const { itemid } = await req.body;
    console.log(itemid)
    try {
       await Item.deleteOne(
        {_id: itemid}
    )
       res.send({status: "Ok", data: "Item Deleted"})
    } catch (error) {
        console.log(error)
    }
})

app.post("/addBid",async(req,res)=>{
    const {userName, bidAmount, itemName} = req.body;
    try {

        await Bid.create({
            itemName: itemName,
            bidAmount: bidAmount,
            userName: userName
        })
        res.send({status: "Ok"});
    } catch (error) {
        res.send({status: error})
    }
})

app.post("/getItemBid",async (req,res)=>{
    const {itemName} = req.body;
    const item = await Bid.find({itemName});
    if(res.status(201)){
        return res.json({status : "Ok", data: item});
    } else{
    return res.json({status: "error"})
    }
})
