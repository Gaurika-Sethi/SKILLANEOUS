import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };

    }catch(error){
        throw new ApiError(500, "Error while generating tokens.");
    }
}

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required.");
    }
    
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    
    if (existingUser) {
        throw new ApiError(
            409,
            "User with given username or email already exists."
        );
    }
    
    const user = await User.create({ 
        username: username.toLowerCase(), 
        email, 
        password 
    });

    const createdUser = await User.findById(user._id);

    if (!createdUser) {
        throw new ApiError(500, "Error in creating user.");
    }

    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "User registered successfully."
        )
    );
});


// login user

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!email  && !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    if(!user){
        throw new ApiError(404, "User not found.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const safeUser = {
        id: user._id,
        username: user.username,
        email: user.email,
    };

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(200).cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            { 
                user: safeUser, 
                accessToken, 
                refreshToken, 
            },
            "User logged in successfully."
        )
    );

})

// logout user
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        { 
            $set: {refreshToken: undefined}
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully."
        )
    );
})

// refresh tokens

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Refresh token is required.");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?.userId);
        if (!user) {
            throw new ApiError(401, "Invalid refresh token.");
        }
    
        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Refresh token does not match.");
        }
    
        const options = {
            httpOnly: true,
            secure: true,
        };
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "Tokens refreshed successfully."
            )
        );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token.");
    }
});

// change password

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect.");
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password must be different from old password.");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password changed successfully."
        )
    );
})

// get current user

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully."
        )
    );
})

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        throw new ApiError(400, "Username and email are required.");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username,
                email,
            },
        },{
            new: true,
            runValidators: true,
        })
        .select("-password -refreshToken");
        
        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }
        
        if (updatedUser.username !== username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                throw new ApiError(409, "Username already taken.");
            }
        }

        if (updatedUser.email !== email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                throw new ApiError(409, "Email already taken.");
            }
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedUser,
                "User profile updated successfully."
            )
        );
    });


export { 
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateUserProfile
};