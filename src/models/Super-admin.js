import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    srname: {
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
    active: {
      type: Boolean,
      requiered: true,
    },
  },
  // {timestamps: true}
);

export default mongoose.model('Super-admin', superAdminSchema);
