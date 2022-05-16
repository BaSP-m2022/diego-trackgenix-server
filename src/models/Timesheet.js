import mongoose from 'mongoose';

const {
  Schema,
} = mongoose;

const timesheet = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    validated: {
      type: Boolean,
      required: true,
    },
    employee: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    projectManager: {
      type: String,
      required: true,
    },
    role: {
      type: String,
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
