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
require("./largestBidDetails")
require("./bidRequestDetails");
require("./requestedItemDetails")
require("./bidStatus")
const Item = mongoose.model("ItemInfo");
const User = mongoose.model("UserInfo");
const Bid = mongoose.model("BidInfo")
const LargestBid = mongoose.model("LargestBidInfo");
const BidRequest = mongoose.model("BidRequestDetailsInfo");
const RequestedItem = mongoose.model("RequestedItemInfo");
const BidStatus = mongoose.model("BidStatusDetailsInfo");


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
app.post("/largestBid",async(req,res)=>{
    const {userName, bidAmount, itemName, itemImage} = req.body;
    const oldItem = await LargestBid.findOne({itemName})
    try {
        if(oldItem)
        {   
           const data =  await LargestBid.updateOne({itemName: itemName},{$set:{userName: userName, bidAmount: bidAmount}})
            res.send({status: "Ok", data: data});
        }
        else{
        await LargestBid.create({
            itemName: itemName,
            bidAmount: bidAmount,
            userName: userName,
            itemImage: itemImage,
        })
        res.send({status: "Ok"});
    }
    } catch (error) {
        res.send({status: error})
    }
})

app.get("/getAllLargestBid",async (req,res)=>{
    try {
        const allItem = await LargestBid.find({});
        res.send({status: "Ok", data: allItem});
    
    } catch (error) {
        console.log(error)
    }
})

app.post("/getLargestBid",async(req,res)=>{
    const {itemName} = req.body;

    try {
        const data = await LargestBid.findOne({itemName})
        res.send({status: "oK", data: data});

    } catch (error) {
        res.send({status: error})
    }
})

app.post("/setInitialBid",async(req,res)=>{
    const {userName, bidAmount, itemName, itemImage} = req.body;
    try {

        await LargestBid.create({
            itemName: itemName,
            bidAmount: bidAmount,
            userName: userName,
            itemImage: itemImage,
        })
        res.send({status: "Ok"});
        
    } catch (error) {
        res.send(error)
    }
})

app.post("/bidRequest",async (req, res)=>{
    const {userEmail, requestedItem} = req.body;
    try {
        await BidRequest.create({
            userEmail: userEmail,
            itemName: requestedItem,
        })
    } catch (error) {
        res.send(error)
    }
})

app.post("/getAllRequest",async (req, res)=>{
    const {userEmail} = req.body;
    try {
        const data = await BidRequest.findOne({ userEmail: userEmail})
        res.send({status: "Ok", data: data});
    } catch (error) {
        res.send(error)
    }
})

app.post("/requestedItemInfo",async(req,res)=>{
    const {itemName} = req.body;
    try {

        const data = await Item.findOne({ itemName: itemName })
        res.send({status: "Ok", data: data});;
    } catch (error) {
        res.send({status: error})
    }
})

app.post("/getRequestedData",async(req,res)=>{
    const {itemName} = req.body;
    try {

        const data = await Item.findOne({ itemName: itemName })
        res.send({status: "Ok", data: data});;
    } catch (error) {
        res.send({status: error})
    }
})


app.post("/requestedItemDelete",async (req,res)=>{
    const { itemName } = await req.body;
    console.log(itemName)
    try {
       await BidRequest.deleteOne(
        {itemName: itemName}
    )
       res.send({status: "Ok", data: "Item Deleted"})
    } catch (error) {
        console.log(error)
    }
})


app.post("/getRequestedItem",async(req,res)=>{
    const {itemName,price,description, image} = req.body;
    try {

        await RequestedItem.create({
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

app.post("/setRequestedItem",async(req,res)=>{
    const {itemName} = req.body;
    try {

        const data = await RequestedItem.findOne({ itemName: itemName })
        res.send({status: "Ok", data: data});;
    } catch (error) {
        res.send({status: error})
    }
})

app.post("/requestedItemData",async(req,res)=>{
    const {itemName} = req.body;
    try {

        const data = await Item.findOne({ itemName: itemName })
        res.send({status: "Ok", data: data});;
    } catch (error) {
        res.send({status: error})
    }
})


app.post("/setStatus",async(req,res)=>{
    const {bidStatus} = req.body;
    try {

       const data =  await BidStatus.create({
            status: bidStatus,
        })
        res.send({status: "Ok",data: data});
    } catch (error) {
        res.send({status: error})
    }
})

app.post("/getStatus",async(req,res)=>{
    const {bidStatus} = req.body;
    try {

       const data =  await BidStatus.findOne({
            status: bidStatus,
        })
        res.send({status: "Ok",data: data});
    } catch (error) {
        res.send({status: error})
    }
})

app.post("/getWinningItem",async (req,res)=>{
    const {itemName} = req.body;
   
    try {
        const data = await LargestBid.findOne({
            itemName: itemName
        });
        res.send({status: "Ok", data: data});
    
    } catch (error) {
        console.log(error)
    }
})








