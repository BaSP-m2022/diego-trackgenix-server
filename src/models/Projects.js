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
    employeeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
    name: { type: String, required: false },
  }],
  qas: [{
    qasId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
    qasName: { type: String, required: false },
  }],
  projectManager: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
  techLeader: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employee' },
  admin: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' },
});

export default mongoose.model('Projects', projectSchema);
