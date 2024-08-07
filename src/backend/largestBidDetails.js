const mongoose = require("mongoose")

const  LargestBidDetailsSchema = new mongoose.Schema(
    {
        itemName: String,
        bidAmount: Number,
        userName: String,
        itemImage: String,
        
    },
    {
        collection: "LargestBidInfo"
    }
);

mongoose.model("LargestBidInfo",LargestBidDetailsSchema);