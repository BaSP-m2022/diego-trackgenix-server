import mongoose from 'mongoose';

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [
  {
    _id: mongoose.Types.ObjectId('60d4a32f257e066e9495ce12'),
    description: 'Here is the descritpion of the task',
    workedHours: '8',
  },
];
