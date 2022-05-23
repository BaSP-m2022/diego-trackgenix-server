import mongoose from 'mongoose';

const { Schema } = mongoose;

const membersSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
  role: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});
export default mongoose.model('Members', membersSchema);
