import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  description: { type: String, required: true },
  client: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  // members: [{
  //   employeeId: { type: String, required: true, ref: 'Members' },
  //   role: { type: String, required: true, ref: 'Members' },
  //   rate: { type: String, required: true, ref: 'Members' },
  // }],
});

export default mongoose.model('Projects', projectSchema);
