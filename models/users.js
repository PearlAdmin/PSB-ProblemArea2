import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";

/**
 * Mongoose schema for representing a user.
 * @module models/users
 * @typedef {Object} User
 * @property {string} username - The username of the user. Required and unique.
 * @property {string} email - The email address of the user. Only applicable to admin and must be manually set in the database. 
 * @property {string} password - The hashed password of the user and is required. 
 * @property {string} role - The role of the user, it can be either 'admin' or 'user'. This property is required and defaults to 'user'.
 */

/**
 * The factor used for generating salt during password hashing.
 * Higher values increase the time it takes to compute the hash but will improve security.
 * @constant {number}
 */
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        trim: true,
        default: 'user',
    }
});

/**
 * Middleware function to hash the user's password before saving it to the database.
 * @function
 * @name save
 * @param {Function} next - Callback function to proceed to the next middleware.
 */
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password"))
        return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch(err){
        console.error(err);
        return next(err);
    }
});

/**
 * Mongoose model representing a user.
 * @type {mongoose.Model<User>}
 */
userSchema.method("comparePassword", function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;