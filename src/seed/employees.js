import mongoose from 'mongoose';

// Generate ObjetId on https://observablehq.com/@hugodf/mongodb-objectid-generator
export default [{
  _id: mongoose.Types.ObjectId('60d4a32f257e066e9495ce12'),
  first_name: 'Esteban',
  last_name: 'Frare',
  email: 'esteban.frare@radiumrocket.com',
  password: 'test1235',
  phone: '999900000',
  active: true,
}];