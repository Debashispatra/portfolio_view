import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
    },
})

const User=mongoose.model("user",userSchema)

export default User