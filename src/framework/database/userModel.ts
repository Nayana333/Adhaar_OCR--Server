import mongoose, { Document, Schema } from 'mongoose';

// Define the IUser interface
interface IUser {
  userId: string;
  userName: string;
  email: string;
  password: string;
  uploadedImages: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  uploadedImages: [{ type: Schema.Types.ObjectId, ref: 'UploadedImage' }],
});

const UserModel = mongoose.model<IUser & Document>('User', UserSchema);

export default UserModel;
