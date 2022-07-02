import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema({
  firebaseUid: { type: String, required: true },
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
  phone: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model('Employee', employeeSchema);
