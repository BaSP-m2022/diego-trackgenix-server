import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema({
  description: {
    type: String,
    required: false,
  },
  workedHours: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
});

export default mongoose.model('Task', tasksSchema);
