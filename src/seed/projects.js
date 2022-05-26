import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6283097baae15b94aa3975b2'),
  name: 'Lorem Ipsum',
  isActive: true,
  description: 'nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
  client: '6283097baae15b94aa3975b3',
  startDate: '02/11/2022',
  endDate: '10/23/2022',
  members: [{ memberId: '628bbbe898e5aad84af57df3' }],
}];
