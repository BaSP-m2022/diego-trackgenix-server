import request from 'supertest';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';
import app from '../app';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

let employeeId;

describe('POST method', () => {
    test('add employee', async () => {
        const response = await request(app).post('/employees').send({
            first_name: 'Juan',
            last_name: 'Free',
            email: 'juan.free@radiumrocket.com',
            password: 'test1235',
        });
        expect(response.status).toBe(201);
        // employeeId = response.body.data._id;
    })
})

describe('/PUT method', () => {
    test('Incorrect id: error:true', async () => {
        const response = await request(app).put('/employees/wrongID');
        expect(response.body.error).not.toBe(false);
    })
    test('Correct id: status 200.', async () => {
        const response = await request(app).put(`/employees/${employeeId}`).send({
            first_name: 'Editado',
            last_name: 'New',
            email: 'edit.nuevo@radiumrocket.com',
            password: 'test1235',
        });
        expect(response.status).toBe(200);
    })
    test('Missing first_name', async () => {
        const response = await request(app).put(`/employees/${employeeId}`).send({
            last_name: 'New',
            email: 'edit.nuevo@radiumrocket.com',
            password: 'test1235',
        });
        expect(response.status).toBe(400);
    })
    test('Missing last_name', async () => {
        const response = await request(app).put(`/employees/${employeeId}`).send({
            first_name: 'Editado',
            email: 'edit.nuevo@radiumrocket.com',
            password: 'test1235',
        });
        expect(response.status).toBe(400);
    })
    test('Missing email', async () => {
        const response = await request(app).put(`/employees/${employeeId}`).send({
            first_name: 'Editado',
            last_name: 'New',
            password: 'test1235',
        });
        expect(response.status).toBe(400);
    })
    test('Missing password', async () => {
        const response = await request(app).put(`/employees/${employeeId}`).send({
            first_name: 'Editado',
            last_name: 'New',
            email: 'edit.nuevo@radiumrocket.com'
        });
        expect(response.status).toBe(400);
    })
});

describe('/DELETE method', () => {
    test('Incorrect id: error:true', async () => {
      const response = await request(app).delete('/employees/wrongID');
      expect(response.body.error).toBe(true);
    });
    test('Correct id: status 200.', async () => {
      const response = await request(app).delete(`/employees/${employeeId}`);
      expect(response.status).toBe(200);
    });
});


