import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema({
  _id: mongoose.Types.ObjectId('6283097baae15b94aa3975b2'),
  name: 'Lorem Ipsum',
  isActive: true,
  description: 'nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
  client: '6283097baae15b94aa3975b3',
  startDate: '12/08/2022',
  endDate: '20/09/2022',
  members: [{
    employeeId: '5dec67bb-8242-4c1c-aff5-ba21ee5609c9',
    role: 'dev',
    rate: '5.35',
  }],
});

export default mongoose.model('Projects', projectSchema);
