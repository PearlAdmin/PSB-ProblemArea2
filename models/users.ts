import {InferSchemaType, model, Schema, models} from 'mongoose';

const UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
});

type User = InferSchemaType<typeof UserSchema>;

export default models.User || model<User>('User', UserSchema);