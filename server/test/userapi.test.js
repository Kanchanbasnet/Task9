const request = require('supertest');
const app = require('../app');
const pool = require('../src/config/database');
const httpStatus = require('http-status');


describe('api/users', () => {
  it('should create a user', async () => {
    const userData = {
      name: "rita",
      email: "rita@gmail.com",
      address: 'Chakrapath',
      username: 'rita123',
      password: 'rita123',
    };
    const response = await request(app).post('/api/users').send(userData);
    expect(response.statusCode).toBe(httpStatus.CREATED);
    expect(response.body.message).toBe('User created successfully.');
  });

  it('should get all the users', async () => {
    const response = await request(app).get('/api/users?page=1&limit=3');
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.data.userQueryResult.length).toBe(3);
  });
  it('should get all the users', async ()=>{
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.data.userQueryResult.length).toBe(10);
  })

  it('should allow the user to login', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        username: 'sita123',
        password: 'sita123',
      });
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body.message).toBe('User login Successfull.');
  });

  it('should get user by id', async () => {
    const userId = "2dcda918-3c8a-46b0-95a6-873de56dcc03";
    const token = `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpdGExMjMiLCJpYXQiOjE2OTk4NzczNTcsImV4cCI6MTY5OTg4MDk1N30.MKb1W972IlHFlkGCtgPtA7zbAmFHGu0X2caxITEIfmA"`; 
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(httpStatus.OK);
  });

  it('should update user by id', async () => {
    const userId = "2dcda918-3c8a-46b0-95a6-873de56dcc03";
    const updatedData = {
      "name": "Rahul",
      "address": "RahulGhar",
      "email": "rahul@gmail.com",
    };
    const response = await request(app).put(`/api/users/${userId}`).send(updatedData);
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body.message).toBe('User updated successfully');
  });

  it('should delete user by id', async () => {
    const userId = "2dcda918-3c8a-46b0-95a6-873de56dcc03";
    const response = await request(app).delete(`/api/users/${userId}`);
    expect(response.statusCode).toBe(httpStatus.OK);
    expect(response.body.message).toBe('User deleted successfully.');
  });

  afterAll(async () => {
    await pool.end();
  });
});
