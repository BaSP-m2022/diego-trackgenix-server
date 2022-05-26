import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  description: { type: String, required: true },
  client: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  members: [{
    membersId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Members',
    },
  }],
});

export default mongoose.model('Projects', projectSchema);
