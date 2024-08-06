const mongoose = require("mongoose")

const  BidDetailsSchema = new mongoose.Schema(
    {
        itemName: String,
        bidAmount: Number,
        userName: String,
        
    },
    {
        collection: "BidInfo"
    }
);

mongoose.model("BidInfo",BidDetailsSchema);