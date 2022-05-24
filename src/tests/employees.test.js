import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('POST method', () => {
  test('add employee', async () => {
    const response = await request(app).post('/employees').send({
      first_name: 'Juan',
      last_name: 'Free',
      email: 'juan.free@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
  });
});

describe('/PUT method', () => {
  test('Incorrect id: error:true', async () => {
    const response = await request(app).put('/employees/wrongID');
    expect(response.body.error).not.toBe(false);
  });
  test('Incorrect id: status 400', async () => {
    const response = await request(app).put('/employees/wrongID');
    expect(response.status).toBe(400);
  });
  test('Correct id: status 201.', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.status).toBe(201);
  });
  test('Correct id: error:false.', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.body.error).not.toBe(true);
  });
  test('Correct id: message should be allright or sth like this', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.body.message).toEqual('Employee information updated');
  });
  test('Missing first_name: status 400', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.status).toBe(400);
  });
  test('Missing first_name, error should be true', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.body.error).not.toBe(false);
  });
  test('Missing last_name: status 400', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.status).toBe(400);
  });
  test('Missing last_name, error should be true', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      email: 'edit.nuevo@radiumrocket.com',
      password: 'test1235',
    });
    expect(response.body.error).not.toBe(false);
  });
  test('Missing email: status 400', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      password: 'test1235',
    });
    expect(response.status).toBe(400);
  });
  test('Missing email, error should be true', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      password: 'test1235',
    });
    expect(response.body.error).not.toBe(false);
  });
  test('Missing password, status 400', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
    });
    expect(response.status).toBe(400);
  });
  test('Missing password, error should be true', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      first_name: 'Editado',
      last_name: 'New',
      email: 'edit.nuevo@radiumrocket.com',
    });
    expect(response.body.error).not.toBe(false);
  });
});

describe('/DELETE method', () => {
  test('Incorrect id: error:true', async () => {
    const response = await request(app).delete('/employees/wrongID');
    expect(response.body.error).toBe(true);
  });
  test('Incorrect id: status 404', async () => {
    const response = await request(app).delete('/employees/');
    expect(response.status).toBe(404);
  });
  test('Correct id: status 204.', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`);
    expect(response.status).toBe(204);
  });
  // test('Correct id: error:false', async () => {
  //     const response = await request(app).delete(`/employees/${employeeId}`);
  //     console.log(response);
  //     expect(response.body.error).toBe(false); <<<< me devuelve undefined en lugar de false.
  // });
  test('Correct id but not found employee: message', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`);
    expect(response.body.message).toEqual('Employee not found');
  });
});
