import { Schema, Document, model } from 'mongoose';

interface User extends Document {
  username: string,
  password: string,
  email: string
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique : true },
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
