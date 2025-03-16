import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/user.js"

dotenv.config();

const generateTokens = (user) =>{
        const accessToken = jwt.sign(
            {userId: user._id}, 
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_ACCESS_EXPIRY}
        );

        const refreshToken = jwt.sign(
            {userId: user._id},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: process.env.JWT_REFRESH_EXPIRY}
        );

        return {accessToken, refreshToken}
};

export const userSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        // Create the hashed password
        const hashedPass = await bcrypt.hash(password, 12);

        // Create new User
        const newUser = new Users({ username, email, password: hashedPass });
        await newUser.save();

        // Generate Access & Refresh Tokens
        const { accessToken, refreshToken } = generateTokens(newUser);

        // Set refresh token in cookies
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict" });

        // Send response with accessToken
        return res.status(201).json({ 
            message: "User Created Successfully", 
            accessToken, 
            user: { _id: newUser._id, username: newUser.username, email: newUser.email } 
        });

    } catch (err) {
        console.error("Signup Error:", err.message);
        return res.status(500).json({ message: "Error in Signing Up" });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        //Check User exists or not
        const userExist = await Users.findOne({ email })
        if (!userExist) return res.status(400).json({ message: "User does not exist!" });

        //Check if password is stored in the database or not
        if (!userExist.password) {
            return res.status(500).json({ message: "User password is missing in the database" });
        }

        //Validate Passsword
        const checkPass = await bcrypt.compare(password, userExist.password);
        if (!checkPass) return res.status(400).json({ message: "Invalid Password" })
        console.log(checkPass)

        const {accessToken, refreshToken} = generateTokens(userExist);

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite:"Strict" });

        return res.status(200).json({ message: "Login successful", accessToken });
    } catch (err) {
        return console.log(err);
    }

}

export const refreshToken = (req,res)=>{
    const { refreshToken } = req.cookies;

    if(!refreshToken) return res.status(401).json({message: "Refresh Token not Provided"});

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded)=>{
        if(err) return res.status(403).json({message:"Invalid Refresh Token"});

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.JWT_SECRET, {expiresIn: "15m"});
        return res.status(200).json({accessToken});
    });
};

export const logout = (req,res)=>{
    res.clearCookie("refreshToken");
    return res.status(200).json({message:"Logout Successfull"});
}



//Creating a Protected Route
export const protectedRoute = (req, res) => {
    res.status(200).json({ message: "Access Granted", user: req.user });
}