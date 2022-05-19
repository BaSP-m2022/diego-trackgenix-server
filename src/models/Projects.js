import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: false },
  clientName: { type: String, required: true },
  active: { type: Boolean, required: true },
  devRate: { type: Number, required: true },
  qaRate: { type: Number, required: true },
  pmRate: { type: Number, required: true },
  tlRate: { type: Number, required: true },
  devs: [{
    employeeId: { type: String, required: false },
    name: { type: String, required: false },
  }],
  qas: [{
    qasId: { type: String, required: false },
    qasName: { type: String, required: false },
  }],
  projectManager: { type: String, required: false },
  techLeader: { type: String, required: false },
  admin: { type: String, required: false },
});

export default mongoose.model('Projects', projectSchema);
