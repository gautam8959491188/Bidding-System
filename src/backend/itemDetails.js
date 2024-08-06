const mongoose = require("mongoose")

const  ItemDetailsSchema = new mongoose.Schema(
    {
        itemName: String,
        price: Number,
        description: String,
        image: String,
        
    },
    {
        collection: "ItemInfo"
    }
);

mongoose.model("ItemInfo",ItemDetailsSchema);