import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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

export { 
    registerUser,
    loginUser,
    logoutUser
};