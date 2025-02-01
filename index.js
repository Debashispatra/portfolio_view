import app  from './server.js';
import mongoConnect from './config/db.js';
import dotenv from "dotenv";

const PORT=process.env.PORT || 3000
mongoConnect.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Backend server start at ${PORT}`);
        console.log("mongodb cloud connected");
    })
}).catch((err)=>{
    console.log('Error occured!!',err);
})
