const messageModel=require('../Models/MessageModel')
const {io} =require('../../index')
const express=require('express');
const http=require('http')
const socketIo=require('socket.io');

const app =express();
const server=http.createServer(app)

function connectIo(){
    socketIo.on('connection', (socket) => {
        console.log('New client connected');
    
        // Send all previous messages to the new client
        Message.find().then((messages) => {
            socketIo.emit('previousMessages', messages);
        });
    
        socketIo.on('message', (messageContent) => {
            const message = new Message({ content: messageContent });
            message.save().then(() => {
                socketIo.emit('message', message);
            });
        });
    
        socketIo.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}


module.exports={connectIo}