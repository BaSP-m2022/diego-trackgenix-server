import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
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
      requiered: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('Super-admin', superAdminSchema);
