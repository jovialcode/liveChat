const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;
const  chat  =  new Schema(
    {
        roomId: {type: String, required:true},
        userName: {type: String, required:true},
        message: {type: String, required:true}
    },
    {
        timestamps: true
    });

let  Chat  =  mongoose.model("Chat", chat);
module.exports  =  Chat;