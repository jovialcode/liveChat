const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;
const  chat  =  new Schema(
    {
        roomId: String,
        userName: String,
        message: String
    },
    {
        timestamps: true
    });

let  Chat  =  mongoose.model("Chat", chat);
module.exports  =  Chat;