import mongoose from 'mongoose';

const { Schema } = mongoose;

const auth = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firebaseUid: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('auth', auth);
