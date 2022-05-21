import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('Test Employees routes', () => {
  test('It should create a new employee', async () => {
    const response = await request(app).post('/employees').send({
      first_name: 'Esteban',
      last_name: 'Frare',
      email: 'esteban.frare@radiumrocket.com',
      password: 'test1235',
      phone: '999900000',
      active: true,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
  });

  test('It should get the employee list', async () => {
    const response = await request(app).get('/employees');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test('It should delete a employee', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
