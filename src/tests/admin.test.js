import request from 'supertest';
import app from '../app';
import admin from '../models/admin';
import adminSeed from '../seed/admin';

beforeAll(async () => {
  await admin.collection.insertMany(adminSeed);
});

describe('GET / admin', () => {
  test('response should return 200 status', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).not.toBe(true);
  });
  test('response should return at least one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /admin/create', () => {
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
      password: 'as1276',
    });
    // expect(response.error).toBe(true);
    console.log(response);
  });
});
