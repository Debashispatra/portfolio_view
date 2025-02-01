import app  from './server.js';
import mongoConnect from './config/db.js'
import env from 'dotenv'

const PORT=process.env.PORT
mongoConnect.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Backend server start at 3000`);
        console.log("mongodb cloud connected");
    })
}).catch((err)=>{
    console.log('Error occured!!',err);
})
