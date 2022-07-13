import mongoose from 'mongoose';

const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
);

export default mongoose.model('Users', UsersSchema);
