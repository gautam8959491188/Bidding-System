const mongoose = require("mongoose")

const  RequestedItemsDetailsSchema = new mongoose.Schema(
    {
        itemName: String,
        price: Number,
        description: String,
        image: String,
        
    },
    {
        collection: "RequestedItemInfo"
    }
);

mongoose.model("RequestedItemInfo",RequestedItemsDetailsSchema);