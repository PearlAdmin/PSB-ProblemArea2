import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        default: 'user'
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;