import request from 'supertest';
import Tasks from '../models/tasks';
import tasksSeed from '../seed/tasks';
import app from '../app';

let newTask;

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});
describe('/GET /tasks', () => {
  test('Return a 200 status, a false error and a success message if the get method worked ok', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('Test to Post', () => {
  test('Test to creat a task, correct', async () => {
    const response = await request(app).post('/tasks/').send({
      description: 'Here is the description of the task',
      workedHours: 8,
    });
    expect(response.body.message).toEqual('Task Added');
    // eslint-disable-next-line no-underscore-dangle
    newTask = response.body.data._id;
  });

  test('Test to create a task with incorrect description', async () => {
    const response = await request(app).post('/tasks/').send({
      description: 1234,
      workedHours: '8',
    });
    expect(response.status).toBe(400);
  });
  test('Test to create task without workedHours', async () => {
    const response = await request(app).post('/tasks/').send({
      description: 'Here is the description',
      workedHours: '',
    });
    expect(response.status).toBe(400);
  });
});
describe('intentando segunda parte', () => {
  test('vamos a hacer un put para actualizar la descripcion', async () => {
    const response = await request(app).put(`/tasks/${newTask}`).send({
      description: 'agregandoa algo',
      workedHours: '5',
    });
    expect(response.status).toBe(200);
  });
});
describe('intentando deletear la tarea', () => {
  test('ahi va la el delete', async () => {
    const response = await request(app).delete('/tasks/60d4a32f257e066e9495ce12').send();
    expect(response.status).toBe(200);
  });
});
