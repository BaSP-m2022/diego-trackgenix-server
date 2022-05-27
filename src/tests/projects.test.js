import request from 'supertest';
import Projects from '../models/projects';
import projectsSeed from '../seed/projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

let projectsId;

describe('POST /projects', () => {
  test('Must create a new Project', async () => {
    const response = await request(app)
      .post('/projects')
      .send({
        name: 'Lorem Ipsum',
        isActive: true,
        description:
          'nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
        client: '6283097baae15b94aa3975b3',
        startDate: '02/11/2022',
        endDate: '10/23/2022',
        members: [{ memberId: '628bbbe898e5aad84af57df3' }],
      });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectsId = response.body.data._id;
  });
  test('Message should indicate creation of project', async () => {
    const response = await request(app)
      .post('/projects')
      .send({
        name: 'Lorem Ipsum',
        isActive: true,
        description:
          'nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
        client: '6283097baae15b94aa3975b3',
        startDate: '02/11/2022',
        endDate: '10/23/2022',
        members: [{ memberId: '628bbbe898e5aad84af57df3' }],
      });
    expect(response.body.message).toEqual('Project created');
    // eslint-disable-next-line no-underscore-dangle
    projectsId = response.body.data._id;
  });
  test('Must not create', async () => {
    const response = await request(app).post('/projects').send({});
    expect(response.status).toBe(400);
  });
});

describe('GET /projects', () => {
  test('Must get the projects list without errors', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
});

describe('GET /projects/:id', () => {
  test('Must return 200 status', async () => {
    const response = await request(app).get(`/projects/${projectsId}`).send();
    expect(response.statusCode).toBe(200);
  });
});

describe('PUT /projects', () => {
  test('Response should throw error', async () => {
    const response = await request(app).put(`/projects/${projectsId}`).send({
      startDate: 'asd',
    });
    expect(response.error).toBeTruthy();
  });
  test('Response should throw error', async () => {
    const response = await request(app).put(`/projects/${projectsId}`).send({
      isActive: 'asd',
    });
    expect(response.error).toBeTruthy();
  });
  test('Must update project', async () => {
    const response = await request(app)
      .put(`/projects/${projectsId}`)
      .send({
        name: 'Lorem Ipsum',
        isActive: false,
        description:
          'nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
        client: '6283097baae15b94aa3975b3',
        startDate: '02/11/2022',
        endDate: '10/23/2022',
        members: [{ memberId: '628bbbe898e5aad84af57df3' }],
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('Project updated');
  });
});

describe('DELETE /projects/:id', () => {
  test('Must delete a project', async () => {
    const response = await request(app).delete(`/projects/${projectsId}`);
    expect(response.statusCode).toBe(204);
  });
});
