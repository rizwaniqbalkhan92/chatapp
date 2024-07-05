const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const DbConnection = require('./src/Config/dbConfig');
const MessageModel = require('./src/Models/MessageModel');

dotenv.config();

const app = express();
const server = createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
DbConnection();

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    // Send all previous messages to the new client
    MessageModel.find().then((messages) => {
        socket.emit('previousMessages', messages);
    });

    // Handle incoming messages
    socket.on('message', (messageContent) => {
        const message = new MessageModel({ content: messageContent });
        message.save().then(() => {
            io.emit('message', message);  // Broadcast the message to all clients
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
