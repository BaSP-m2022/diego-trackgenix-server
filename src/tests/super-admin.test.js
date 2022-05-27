import request from 'supertest';
import Superadmin from '../models/super-admins';
import SuperAdminSeed from '../seed/super-admins';
import app from '../app';

beforeAll(async () => {
  await Superadmin.collection.insertMany(SuperAdminSeed);
});

let superAdminId;

describe('POST /super-admins', () => {
  test('Response should return 201 status and object', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
      password: 'a123456789',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data).toMatchObject({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
      password: 'a123456789',
    });
    // eslint-disable-next-line no-underscore-dangle
    superAdminId = response.body.data._id;
  });
  test('Response body message should indicate super admin was created', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
      password: 'a123456789',
    });
    expect(response.body.message).toMatch('Super Admin created');
  });
  test('Should not create Super Admin and throw error', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
    });
    expect(response.error).toBeTruthy();
  });
  test('Response body data of incomplete request should be undefined', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
    });
    expect(response.body.data).toBeUndefined();
  });
});

describe('GET /super-admins', () => {
  test('Response should return 200 status', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.statusCode).toBe(200);
  });
  test('Response should return at least one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.error).toBeFalsy();
  });
  test('Response message should indicate Super Admin was found', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.message).toMatch('Super Admin found');
  });
});

describe('GET /super-admins/:id', () => {
  test('Response should return 200 status', async () => {
    const response = await request(app)
      .get(`/super-admins/${superAdminId}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test('Response should return 404 status', async () => {
    const response = await request(app)
      .get('/super-admins/628a59dcee3ba3f8969caa89')
      .send();
    expect(response.statusCode).toBe(404);
  });
  test('Response should return only the Super Admin with the Id indicated', async () => {
    const response = await request(app)
      .get(`/super-admins/${superAdminId}`)
      .send();
    expect(response.body.data).toMatchObject({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
      password: 'a123456789',
    });
  });
});

describe('PUT /super-admins/:id', () => {
  test('Response should throw error because of invalid email', async () => {
    const response = await request(app)
      .put(`/super-admins/${superAdminId}`)
      .send({
        firstName: 'Paula',
        lastName: 'Rinaldi',
        email: 'paurinaldi95@gmai',
        password: 'a123456789',
      });
    expect(response.error).toBeTruthy();
  });
  test('Response should throw error because of missing keys', async () => {
    const response = await request(app)
      .put(`/super-admins/${superAdminId}`)
      .send({
        firstName: 'Paul',
        email: 'paurinaldi95@gmail.com',
      });
    expect(response.error).toBeTruthy();
  });
  test('Response should return 404 status and message indicates super admin was not found', async () => {
    const response = await request(app)
      .put('/super-admins/628a59dcee3ba3f8969caa89')
      .send({
        firstName: 'Paula',
        lastName: 'Rinaldi',
        email: 'paurinaldi95@gmail.com',
        password: 'a123456789',
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch('Super Admin not found');
  });
  test('Response should return updated Super Admin and respose status should be 201', async () => {
    const response = await request(app)
      .put(`/super-admins/${superAdminId}`)
      .send({
        firstName: 'Paula',
        lastName: 'Rinaldi',
        email: 'paurinaldi95@gmail.com',
        password: 'aaaaaa123456789',
      });
    expect(response.body.data).toMatchObject({
      firstName: 'Paula',
      lastName: 'Rinaldi',
      email: 'paurinaldi95@gmail.com',
      password: 'aaaaaa123456789',
    });
    expect(response.statusCode).toBe(201);
  });
});
test('Response should throw error', async () => {
  const response = await request(app)
    .put(`/super-admins/${superAdminId}`)
    .send({
      firstName: 'Paul',
    });
  expect(response.error).toBeTruthy();
});

describe('Delete /super-admins/:id', () => {
  test('Should return 404 status and fail to delete', async () => {
    const response = await request(app)
      .delete('/super-admins/628a59dcee3ba3f8969caa89')
      .send();
    expect(response.statusCode).toBe(404);
  });
  test('Response should return 204 status', async () => {
    const response = await request(app)
      .delete(`/super-admins/${superAdminId}`)
      .send();
    expect(response.statusCode).toBe(204);
    expect(response.error).toBeFalsy();
  });
});
