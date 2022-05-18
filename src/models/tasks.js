import mongoose from 'mongoose';

const { Schema } = mongoose;
const tasksSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
);

export default mongoose.model('Tasks', tasksSchema);
