import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;
describe('/POST method', () => {
  test('Complete body: Status 201', async () => {
    const response = await request(app).post('/employees').send({
      first_name: 'hola',
      last_name: 'como',
      email: 'estas.frare@jeje.com',
      password: 'probandoe345',
    });
    expect(response.statusCode).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
  });
  test('Complete body: error to be false.', async () => {
    const response = await request(app).post('/employees').send({
      first_name: 'Felipe',
      last_name: 'Gonzales',
      email: 'another.employee@trackgenix.com',
      password: 'test1235',
    });
    expect(response.body.error).toBe(false);
  });
  test('Empty body: status 400', async () => {
    const response = await request(app).post('/employees').send();
    expect(response.statusCode).toBe(400);
  });
  test('Incomplete body: error to be true.', async () => {
    const response = await request(app).post('/employees').send({
      email: 'esteban.frare@radiumrocket.com',
      password: 'test1235',
    });

    expect(response.body.error).toBe(true);
  });
  test('Propertys undefined on body: has an error.', async () => {
    const response = await request(app).post('/employees').send({
      cualquiercosa: 'esteban.frare@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.body.error).toBe(true);
  });
  test('Property first_name no respect characters minimum: has an error.', async () => {
    const response = await request(app).post('/employees').send({
      first_name: 'h',
      last_name: 'como',
      email: 'estas.frare@jeje.com',
      password: 'probandoe345',
    });
    expect(response.body.error).toBe(true);
  });
});

describe('/GET method', () => {
  test('To get: Status 200', async () => {
    const response = await request(app).get('/employees');
    expect(response.statusCode).toBe(200);
  });
  test('To get: error:false;', async () => {
    const response = await request(app).get('/employees');
    expect(response.body.error).toBe(false);
  });
  test('To get: at least one employee on object', async () => {
    const response = await request(app).get('/employees');
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('To get for id, the employee returned is it', async () => {
    const response = await request(app).get(`/employees/${employeeId}`);
    // eslint-disable-next-line no-underscore-dangle
    expect(response.body.data._id).toBe(employeeId);
  });
});
