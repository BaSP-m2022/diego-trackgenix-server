import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
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
      requiered: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('Super-admin', superAdminSchema);