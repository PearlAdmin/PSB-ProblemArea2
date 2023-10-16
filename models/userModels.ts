import { Schema, models, model} from 'mongoose';

interface User{
    username: string;
    password: string;
    isAdmin: boolean;
}

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false}
});

const User = models.User || model<User>('User', userSchema);

export default User;