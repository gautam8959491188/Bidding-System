const mongoose = require("mongoose")

const UserDetailsSchema = new mongoose.Schema(
    {
        userName: {type: String, unique: true},
        email: String,
        password: String,
        UserType: String,
        
    },
    {
        collection: "UserInfo"
    }
);

mongoose.model("UserInfo",UserDetailsSchema);