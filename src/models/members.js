import mongoose from 'mongoose';

const { Schema } = mongoose;

const membersSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
});
export default mongoose.model('Members', membersSchema);
