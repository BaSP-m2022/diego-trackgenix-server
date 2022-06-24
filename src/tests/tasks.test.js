import request from 'supertest';
import Tasks from '../models/tasks';
import tasksSeed from '../seed/tasks';
import app from '../app';

let newTask;

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
});
describe('Haciendo prueba de GET', () => {
  test('Al recibir todas las tasks reciba un status 200', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.statusCode).toBe(200);
  });
  test('cheking error to false', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });
  test('Getting by ID', async () => {
    const response = await request(app).get(`/tasks/${newTask}`).send();
    expect(response.status).toBe(200);
  });
});

describe('Test to Post', () => {
  test('Test to creat a task, correct', async () => {
    const response = await request(app).post('/tasks/').send({
      description: 'Here is the description of the task',
      workedHours: '8',
    });
    expect(response.body.msg).toEqual('Tasks has been created');
    // eslint-disable-next-line no-underscore-dangle
    newTask = response.body.newTaskDone._id;
  });

  test('Test to create a task with incorrect description', async () => {
    const response = await request(app).post('/tasks/').send({
      description: '...',
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
    const response = await request(app).delete(`/tasks/${newTask}`).send();
    expect(response.status).toBe(204);
  });
});
