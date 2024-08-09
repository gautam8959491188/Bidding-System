const mongoose = require("mongoose")

const WinnerDetailsSchema = new mongoose.Schema(
    {
        userName: String,
        itemName: String,
        bidAmount: String,
        itemImage: String,
        
    },
    {
        collection: "WinnerInfo"
    }
);

mongoose.model("WinnerInfo",WinnerDetailsSchema);