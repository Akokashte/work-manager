import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required field !!"]
        },
        email: {
            type: String,
            required: [true, "email is required field !!"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "password is required field !!"]
        },
        about: {
            type: String,
            required: true
        },
        profileUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.index({email:1})


userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, Number(process.env.BCRYPT_SALT));
        return next()
    } catch (error) {
        return next(error)
    }

})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRTY
        }
    )
}

export const User = mongoose.models.User || mongoose.model("User", userSchema)