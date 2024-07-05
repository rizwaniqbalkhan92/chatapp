const express=require('express');
const http=require('http')
const socket=require('socket.io');
const dotenv=require('dotenv');
const DbCOnnection = require('./src/Config/dbConfig');
const {connectIo} = require('./src/SocketIo/socketIo');
const MessageModel = require('./src/Models/MessageModel');

dotenv.config()

const app =express();
const server=http.createServer(app)
const io=socket(server)


DbCOnnection()
// connectIo()
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("SERVER RUNING AT",PORT);

    io.on('connection', (socket) => {
        console.log('New client connected');
    
        // Send all previous messages to the new client
        MessageModel.find().then((messages) => {
            console.log("CHECK===>>",messages)
            socket.emit('previousMessages', messages);
        });
    
        socket.on('message', (messageContent) => {
            const message = new MessageModel({ content: messageContent });
            message.save().then(() => {
                io.emit('message', message);
            });
        });
    
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

})

