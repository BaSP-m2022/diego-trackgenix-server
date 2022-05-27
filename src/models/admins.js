import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('admin', adminSchema);
