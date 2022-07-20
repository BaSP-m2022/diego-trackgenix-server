import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheet = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    validated: {
      type: Boolean,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Projects',
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Timesheet', timesheet);
