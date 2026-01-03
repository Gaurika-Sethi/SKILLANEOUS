import mangoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    careerGoal: {
        type: String,
        required: true,
        trim: true,
    },
},{timestamps:true})

export const User = mangoose.model("User", userSchema);