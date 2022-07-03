import  mongoose  from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

//for login schima
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name:String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    //importent for switch model schimas 
    // timestamps: true,
})
//autoIncrement is use for increment the id automatecly at browser and at databaise 
postSchema.plugin(autoIncrement,'postMessage');

//model of login
const PostMessage = new mongoose.model("postMessage", postSchema)

export default PostMessage ;