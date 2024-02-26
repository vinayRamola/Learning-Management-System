import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from 'crypto'

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, "Name is required"],
        minLength: [5, "Name must be at least 5 character"],
        maxLength: [50, "Name should be less than 50 character"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true, 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/]
    },
    password: {
        type: "String",
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 character"],
        select: false
    },
    avatar: {
        public_id: {
            type: "String"
        },
        secure_url: {
            type: "String"
        }
    },
    forgetPasswordToken: {
        type: String
    },
    forgetPasswordExpiry: {
        type: Date
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    subscription: {
        id: String,
        status: String
    }
},{timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next()

})

userSchema.methods = {
    generateJWTToken: async function () {
        return await jwt.sign(
            {id: this._id, email: this.email, subscription: this.subscription, role: this.role }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword: async function (plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password)
    },

    generatePasswordToken: function (){
        const resetToken = crypto.randomBytes(20).toString("hex")
        
        this.forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000

        return resetToken
    }
}


const User = model("User", userSchema)
export default User