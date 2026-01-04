import mongoose, { Schema } from "mongoose";

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
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    careerGoal: {
        type: String,
        required: true,
        trim: false,
    },
},{timestamps:true})

export const User = mangoose.model("User", userSchema);