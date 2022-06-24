import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    workedHours: {
      type: Number,
    },
    date: {
      type: Date,
    },

  },
);

export default mongoose.model('Task', tasksSchema);
