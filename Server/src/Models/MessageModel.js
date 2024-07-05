const mongoose= require('mongoose');

const MessageSchema= new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now },
})

const MessageModel= mongoose.model("messageModel",MessageSchema);

module.exports=MessageModel