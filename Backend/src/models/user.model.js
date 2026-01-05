import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mangoose.model("User", userSchema);