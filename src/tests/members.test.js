import request from 'supertest';
import Members from '../models/Members';
import MemberSeed from '../seed/members';
import app from '../app';

beforeAll(async () => {
  await Members.collection.insertMany(MemberSeed);
});

let memberId;

describe('POST /members', () => {
  test('Response should return 201 status and object', async () => {
    const response = await request(app).post('/members').send({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'Dev',
      rate: 90,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data).toMatchObject({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'Dev',
      rate: 90,
    });
    // eslint-disable-next-line no-underscore-dangle
    memberId = response.body.data._id;
  });
  test('Response body message should indicate Member was created', async () => {
    const response = await request(app).post('/members').send({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'Dev',
      rate: 90,
    });
    expect(response.body.message).toMatch('Member created');
  });
  test('Should not create Member and throw error', async () => {
    const response = await request(app).post('/members').send({
      role: 'Dev',
      rate: 90,
    });
    expect(response.error).toBeTruthy();
  });
  test('Response body data of incomplete request should be undefined', async () => {
    const response = await request(app).post('/members').send({
      role: 'Dev',
      rate: 90,
    });
    expect(response.body.data).toBeUndefined();
  });
});

describe('GET /members', () => {
  test('Response should return 200 status', async () => {
    const response = await request(app).get('/members').send();
    expect(response.statusCode).toBe(200);
  });
  test('Response should return at least one member', async () => {
    const response = await request(app).get('/members').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('Response should return false error', async () => {
    const response = await request(app).get('/members').send();
    expect(response.error).toBeFalsy();
  });
});

describe('GET /members/:id', () => {
  test('Response should return 200 status', async () => {
    const response = await request(app).get(`/members/${memberId}`).send();
    expect(response.statusCode).toBe(200);
  });
  test('Response should return 404 status', async () => {
    const response = await request(app).get('/members/628a59dcee3ba3f8969caa89').send();
    expect(response.statusCode).toBe(404);
  });
  test('Response should return only the Member with the Id indicated', async () => {
    const response = await request(app).get(`/members/${memberId}`).send();
    expect(response.body.data).toMatchObject({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'Dev',
      rate: 90,
    });
  });
});

describe('PUT /members/:id', () => {
  test('Response should throw error', async () => {
    const response = await request(app).put(`/members/${memberId}`).send({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'Dev',
      rate: 'lalala',
    });
    expect(response.error).toBeTruthy();
  });
  test('Response should return 404 status and message indicates super admin was not found', async () => {
    const response = await request(app).put('/members/628a59dcee3ba3f8969caa89').send({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'Dev',
      rate: 90,
    });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toMatch('Member not found');
  });
  test('Response should return updated Member and respose status should be 201', async () => {
    const response = await request(app).put(`/members/${memberId}`).send({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'QA',
      rate: 90,
    });
    expect(response.body.data).toMatchObject({
      employeeId: '6281860dc32e7c819a91b357',
      role: 'QA',
      rate: 90,
    });
    expect(response.statusCode).toBe(201);
  });
});

describe('Delete /members/:id', () => {
  test('Should return 404 status and fail to delete', async () => {
    const response = await request(app).delete('/members/628a59dcee3ba3f8969caa89').send();
    expect(response.statusCode).toBe(404);
  });
  test('Response should return 204 status', async () => {
    const response = await request(app).delete(`/members/${memberId}`).send();
    expect(response.statusCode).toBe(204);
    expect(response.error).toBeFalsy();
  });
});
