const express=require('express');
const http=require('http')
const socket=require('socket.io');
const dotenv=require('dotenv');
const DbCOnnection = require('./src/Config/dbConfig');


dotenv.config()

const app =express();
const server=http.createServer(app)
const io=socket(server)
DbCOnnection()
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("SERVER RUNING AT",PORT);

})


