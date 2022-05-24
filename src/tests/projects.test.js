import request from 'supertest';
import Projects from '../models/Projects';
import projectsSeed from '../seed/projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

let projectsId;

describe('POST /projects', () => {
  test('Must create a new Project', async () => {
    const response = await request(app).post('/projects').send({
      name: 'Lorem Ipsum',
      isActive: true,
      description: 'nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor',
      client: '6283097baae15b94aa3975b3',
      startDate: '02/11/2022',
      endDate: '10/23/2022',
      // members: [{
      //     employeeId: '5dec67bb-8242-4c1c-aff5-ba21ee5609c9',
      //     role: 'dev',
      //     rate: '5.35',
      // }],
    });
    console.log(response);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectsId = response.body.data._id;
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

// describe('PUT /projects', () => {
//   test('Response should throw error', async () => {
//     const response = await request(app).put(`/projects/${projectsId}`).send({
//       startDate: 'asd',
//     });
//     expect(response.error).toBeTruthy();
//   });
//   test('Response should throw error', async () => {
//     const response = await request(app).put(`/projects/${projectsId}`).send({
//       isActive: 'asd',
//     });
//     expect(response.error).toBeTruthy();
//   });
//   test('Must update project', async () => {
//     const response = await request(app).put(`/projects/${projectsId}`).send({
//       name: 'Lorem Ipsum',
//       isActive: true,
//       description: 'nunc purus phasellus in felis donec semper s',
//       client: '6283097baae15b94aa3975b3',
//       startDate: '02/11/2022',
//       endDate: '10/23/2022'
// // members: [{
// //     employeeId: '5dec67bb-8242-4c1c-aff5-ba21ee5609c9',
// //     role: 'dev',
// //     rate: '5.35',
// // }],
//     });
//     console.log(response);
//     expect(response.status).toBe(201);
//   });
// });

// describe('DELETE /projects/:id', () => {
//     test('Must delete a project', async () => {
//       const response = await request(app).delete(`/projects/${projectsId}`).send();
//       expect(response.statusCode).toBe(200);
//       console.log(response);
//     });
//   });
