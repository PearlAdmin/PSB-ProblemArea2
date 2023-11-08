import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt";

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

userSchema.method("comparePassword", function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;