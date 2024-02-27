import mongoose from "mongoose";
// mongoose.Promise = global.Promise;

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    githurl: {
        type: String,
        require: true
    },
    img: {
        data: Buffer,
        contentType:String
    },
    tech: {
        type: String,
        require: true
    }
});

const Project = mongoose.model("project", experienceSchema);

export default Project