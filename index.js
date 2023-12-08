import app  from './server.js';
import mongoConnect from './config/db.js'
const port=3000
mongoConnect.then(()=>{
    app.listen(port,()=>{
        console.log(`Backend server start at ${port}`);
        console.log("mongodb cloud connected");
    })
}).catch((err)=>{
    console.log('Error occured!!',err);
})
