import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheet = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task',
    },
    validated: {
      type: Boolean,
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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Timesheet', timesheet);
