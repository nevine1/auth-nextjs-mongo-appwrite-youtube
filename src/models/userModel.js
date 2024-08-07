import mongoose from 'mongoose';
import { string } from 'yup';

 const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, "User name is require"], 
        unique: true
    }, 
    email: {
        type: string,
        require: [true, "Email is required"],
        unique: true,
    }, 
    password: {
        type: string,
        required: [true, "Password is required"]
    }, 
    isVerified: {//this field is if user is verfied or not , if not , there is an email will sent to verify it 
        type: boolean,
        default: false
    }, 
    isAdmin: { // this is the role 
        type: boolean,
        default: false
    }, 
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Dates,

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;