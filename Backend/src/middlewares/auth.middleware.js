import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");
    
        if (!token) {
            throw new ApiError(401, "Access token is missing");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?.userId).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "User not found");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new Error(401, error?.message || "Authentication failed");
    }
})