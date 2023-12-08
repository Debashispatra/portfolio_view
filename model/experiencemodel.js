import mongoose from "mongoose";

const experienceSchema=new mongoose.Schema({
    company:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    timeline:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
})

const Exp=mongoose.model("experience",experienceSchema)

export default Exp