import {Model, model, Schema} from "mongoose";

interface IUser {
    id: string;
    email: string;
    name: string;
}

const UserSchema = new Schema<IUser>({
    id: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    }
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export {User, IUser}