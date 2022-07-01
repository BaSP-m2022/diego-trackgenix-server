/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app';
import admin from '../models/admins';
import adminSeed from '../seed/admins';

beforeAll(async () => {
  await admin.collection.insertMany(adminSeed);
});

let adminId;

describe('GET /admins', () => {
  test('response should return 200 status', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).not.toBe(true);
  });
  test('response should return at least one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).not.toBeTruthy();
  });
  test('Response message should indicates that an Admin was found', async () => {
    const response = request(app).get('/admins').send();
    expect((await response).body.message).toMatch('Admin found');
  });
});

describe('POST /admins', () => {
  test('Should return a 201 status and an object', async () => {
    const response = await request(app).post('/admins/').send({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
      password: 'MuQ1zKT6',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data).toMatchObject({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
      password: 'MuQ1zKT6',
    });
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });
  test('Response body message Admin was created', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
      password: 'MuQ1zKT6',
    });
    expect(response.body.message).toMatch('Admin Created');
  });
  test('should answer with an error and do not create the new object', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
    });
    expect(response.error).not.toBeFalsy();
  });
  test('Should answer that the body is incomplete and undefined', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
    });
    expect(response.body.data).toBeUndefined();
  });
});

describe('GET /admins/:id', () => {
  test('Answer with a 200 status', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.statusCode).toBe(200);
  });
  test('Response should return a 404 status', async () => {
    const response = await request(app)
      .get('/admins/628a59dcee3ba3f8969caa89')
      .send();
    expect(response.statusCode).toBe(404);
  });
  test('Answer with the admin called', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).toMatchObject({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
      password: 'MuQ1zKT6',
    });
  });
});

describe('PUT / admins', () => {
  test('Error from updating an admin', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Waylen',
      lastName: 'Prugel',
    });
    expect(response.body.error).toBeTruthy();
  });
  test('Answer with a message that there are missing some keys', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      lastName: 'Prugel',
    });
    expect(response.error).toBeTruthy();
  });
  test('Answer with a 404 status code', async () => {
    const response = await request(app)
      .put('/admins/628a59dcee3ba3f8969caa89')
      .send({
        firstName: 'Waylen',
        lastName: 'Prugel',
        email: 'wprugel1@homestead.com',
        gender: 'male',
        active: true,
        password: 'MuQ1zKT6',
      });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch('Admin not found');
  });
  test('Response should return a 201 status with admin updated', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
      password: 'hgc65474',
    });
    expect(response.body.data).toMatchObject({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@homestead.com',
      gender: 'male',
      active: true,
      password: 'hgc65474',
    });
    // console.log(reponse.body.data);
    expect(response.statusCode).toBe(201);
  });
  test('Error for invalid key', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Waylen',
      lastName: 'Prugel',
      email: 'wprugel1@ho',
      gender: 'male',
      active: true,
      password: 'MuQ1zKT6',
    });
    expect(response.error).not.toBeFalsy();
  });
});

describe('DELETE /admins', () => {
  test('Should response a 404 status code and fail to delete the admin', async () => {
    const response = await request(app)
      .delete('/admins/628a59dcee3ba3f8969caa89')
      .send();
    expect(response.statusCode).toBe(404);
  });
  test('Response should return a 200 status code', async () => {
    const response = await request(app).delete(`/admins/${adminId}`).send();
    expect(response.statusCode).toBe(204);
    expect(response.error).not.toBeTruthy();
  });
});
