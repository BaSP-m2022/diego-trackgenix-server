import mongoose from 'mongoose';

const { Schema } = mongoose;

const timesheet = new Schema(
  {
    description: {
      type: String,
      required: false,
    },
    validated: {
      type: Boolean,
      required: false,
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
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Employee',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Projects',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Timesheet', timesheet);
