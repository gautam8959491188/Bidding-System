const mongoose = require("mongoose")

const  BidStatusDetailsSchema = new mongoose.Schema(
    {
        status: String,
        
    },
    {
        collection: "BidStatusDetailsInfo"
    }
);

mongoose.model("BidStatusDetailsInfo",BidStatusDetailsSchema);