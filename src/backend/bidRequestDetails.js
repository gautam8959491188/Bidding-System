const mongoose = require("mongoose")

const  BidRequestDetailsSchema = new mongoose.Schema(
    {
        itemName: String,
        userEmail: String,
        
    },
    {
        collection: "BidRequestDetailsInfo"
    }
);

mongoose.model("BidRequestDetailsInfo",BidRequestDetailsSchema);