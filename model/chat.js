const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;
const  chat  =  new Schema(
    {
        roomId: String,
        userId: String,
        message: String,
        createDate : {type:Date, default: Date.now()}
    },
    {
        timestamps: true
    });

let  Chat  =  mongoose.model("Chat", chat);
module.exports  =  Chat;