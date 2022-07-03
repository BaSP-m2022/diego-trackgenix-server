import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firebaseUid: { type: String, required: true },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

export default mongoose.model('Employee', employeeSchema);
