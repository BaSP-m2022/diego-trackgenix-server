// import request from 'supertest';
// import Tasks from '../models/tasks';
// import tasksSeed from '../seed/tasks';
// import app from '../app';

// let newTask;
// eslint-disable-next-line max-len
// const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVhNWY2NDYxMjA4Y2ZmMGVlYzgwZDFkYmI1MjgyZTkyMDY0MjAyNWEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTWF0aWFzIENlbGxhbWFyZSIsInJvbGUiOiJFTVBMT1lFRSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9iYXNwLTIwMjItdHJhY2tnZW5peC01MmUyNiIsImF1ZCI6ImJhc3AtMjAyMi10cmFja2dlbml4LTUyZTI2IiwiYXV0aF90aW1lIjoxNjU3NzIwMTUzLCJ1c2VyX2lkIjoicWswWVpCVEFPblF0MFlmM1dvdGQ0aDRVVE5aMiIsInN1YiI6InFrMFlaQlRBT25RdDBZZjNXb3RkNGg0VVROWjIiLCJpYXQiOjE2NTc3MjAxNTMsImV4cCI6MTY1NzcyMzc1MywiZW1haWwiOiJ0ZXN0MTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3QxMEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.YPZ1wBP2WXHtk_O5n7Qhy6dvmMOJQCAUP9b1JhGcF71WKH7EX19WMKGKbbVbSZ1evQdnOmq6mca35Mn2s6ecT_SPpKH6wqw6-6WUPuiUjxMsozxkZkRbHz_olqK_u_Qwl_ly9_UGLz29Y5oTGZ3NhArj39mVo8Shzbyii750khkKgz2ZzPB-hLRAXkR-cjpD97SCjYbNnirfzlKi0Mib4LeonR8RAU9uQaGAurj5yctcL1FwXTjSMhx6vlkDNnsiCwyVEqz9gVF7RE6OKmJqwEqPaHBEYfT8wToZb5-xeAjdFX79-ZgXH0B_JpjHkjrpO3xm0LNtR8OgkcS7MTTY-g';

// beforeAll(async () => {
//   await Tasks.collection.insertMany(tasksSeed);
// });
// describe('Haciendo prueba de GET', () => {
//   test('Al recibir todas las tasks reciba un status 200', async () => {
//     const response = await request(app).get('/tasks').send({
//       headers: {
//         token,
//       },
//     });
//     expect(response.statusCode).toBe(200);
//   });
//   test('cheking error to false', async () => {
//     const response = await request(app).get('/tasks').send({
//       headers: {
//         token,
//       },
//     });
//     expect(response.error).toBe(false);
//   });
//   test('Getting by ID', async () => {
//     const response = await request(app).get(`/tasks/${newTask}`).send({
//       headers: {
//         token,
//       },
//     });
//     expect(response.status).toBe(200);
//   });
// });

// describe('Test to Post', () => {
//   test('Test to creat a task, correct', async () => {
//     const response = await request(app).post('/tasks/').send({
//       description: 'Here is the description of the task',
//       workedHours: '8',
//     });
//     expect(response.body.msg).toEqual('Tasks has been created');
//     // eslint-disable-next-line no-underscore-dangle
//     newTask = response.body.newTaskDone._id;
//   });

//   test('Test to create a task with incorrect description', async () => {
//     const response = await request(app).post('/tasks/').send({
//       description: '...',
//       workedHours: '8',
//     });
//     expect(response.status).toBe(400);
//   });
//   test('Test to create task without workedHours', async () => {
//     const response = await request(app).post('/tasks/').send({
//       description: 'Here is the description',
//       workedHours: '',
//     });
//     expect(response.status).toBe(400);
//   });
// });
// describe('intentando segunda parte', () => {
//   test('vamos a hacer un put para actualizar la descripcion', async () => {
//     const response = await request(app).put(`/tasks/${newTask}`).send({
//       description: 'agregandoa algo',
//       workedHours: '5',
//     });
//     expect(response.status).toBe(200);
//   });
// });
// describe('intentando deletear la tarea', () => {
//   test('ahi va la el delete', async () => {
//     const response = await request(app).delete(`/tasks/${newTask}`).send();
//     expect(response.status).toBe(204);
//   });
// });
