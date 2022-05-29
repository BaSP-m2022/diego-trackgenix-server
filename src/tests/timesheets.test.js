import request from 'supertest';
import Timesheet from '../models/timesheets';
import timeSheetsSeed from '../seed/timesheetss';
import app from '../app';

beforeAll(async () => {
  await Timesheet.collection.insertMany(timeSheetsSeed);
});

let timesheetId;
describe('POST /timesheets', () => {
  test('must create a new timesheet', async () => {
    const response = await request(app).post('/timesheets').send({
      description: 'Lore ipsum alea',
      taskId: '6288381b3cc385ea8322a597',
      validated: true,
      employeeId: '6281860dc32e7c819a91b357',
      projectId: '6283097baae15b94aa3975b2',
      startDate: '11/07/2021',
      endDate: '12/20/2021',
      hours: 80,
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    timesheetId = response.body.data._id;
  });
});

describe('GET /timesheets', () => {
  test('response 200 status', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.status).toBe(200);
  });
  test('response should be error', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.error).toBe(false);
  });
  test('must be at least 1', async () => {
    const response = await request(app).get('/timesheets').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /timesheets/:id', () => {
  test('must get timesheet by Id, response 200', async () => {
    const response = await request(app)
      .get(`/timesheets/${timesheetId}`)
      .send();
    expect(response.statusCode).toBe(200);
  });
  test('should not throw timesheet, response 404', async () => {
    const response = await request(app)
      .get('/timesheets/628a58dcee3ba3f7967caa95')
      .send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });
});

describe('PUT /timesheets/:id', () => {
  test('must update a certain timesheet, response 201', async () => {
    const response = await request(app).put(`/timesheets/${timesheetId}`).send({
      description: 'Lore ipsum alea',
      taskId: '6288381b3cc385ea8322a597',
      validated: true,
      employeeId: '6281860dc32e7c819a91b357',
      projectId: '6283097baae15b94aa3975b2',
      startDate: '11/07/2021',
      endDate: '12/20/2021',
      hours: 120,
    });
    expect(response.status).toBe(201);
  });
});

describe('DELETE /timesheets/:id', () => {
  test('should not delete false id, response 404', async () => {
    const response = await request(app)
      .delete('/timesheets/628a58dcee3ba3f7967caa95')
      .send();
    expect(response.status).toBe(404);
  });
  test('must delete a certain timesheet', async () => {
    const response = await request(app)
      .delete(`/timesheets/${timesheetId}`)
      .send();
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
  });
});
