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
    done: {
      type: Boolean,
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Projects',
    },

  },
);

export default mongoose.model('Task', tasksSchema);
