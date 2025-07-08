import mongoose from "mongoose";
import { randomUUID } from "crypto";

// making the chat schema
const chatSchema = new mongoose.Schema({
    id: {
        type: String, 
        default: randomUUID()
    },
    // roles are of the assistant and the user
    role:{
        type: String, 
        enum: ["user", "assistant"],
        required: true,
    },
    content: {
        type: String,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email:{
        type: String, 
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,

    },
    chats:[
        chatSchema
    ]
})

export default mongoose.model("User", userSchema)

