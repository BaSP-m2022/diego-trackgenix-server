import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    firebaseUid: { type: String, required: true },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('admin', adminSchema);
