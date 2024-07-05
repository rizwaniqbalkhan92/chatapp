const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config()
const DB_URL= process.env.DB_URL

const DbCOnnection=async()=> {
    await mongoose.connect(`${DB_URL}`)
    .then(()=>console.log("DB_CONNECTED"))
    .catch((error)=>console.log("ERROR",error))
}


module.exports=DbCOnnection