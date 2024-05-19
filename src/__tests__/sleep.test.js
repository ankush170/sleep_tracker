import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import dotenv from 'dotenv';
import { DB_NAME } from "../constants.js"

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Sleep API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/sleep/users').send({ username: 'testuser' });
    console.log('Create User Response:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
  });

  it('should add a sleep record for a user', async () => {
    const userRes = await request(app).post('/api/sleep/users').send({ username: 'testuser1' });
    console.log('User Response:', userRes.body);
    const userId = userRes.body.data._id;

    const sleepRes = await request(app)
      .post('/api/sleep')
      .send({
        userId,
        duration: 8,
        timestamp: new Date().toISOString(),
      });
    console.log('Add Sleep Record Response:', sleepRes.body);
    expect(sleepRes.statusCode).toBe(201);
    expect(sleepRes.body.data).toHaveProperty('_id');
    expect(sleepRes.body.data.duration).toBe(8);
  });

  it('should get all sleep records for a user', async () => {
    const userRes = await request(app).post('/api/sleep/users').send({ username: 'testuser2' });
    console.log('User Response:', userRes.body);
    const userId = userRes.body.data._id;

    await request(app).post('/api/sleep').send({
      userId,
      duration: 7,
      timestamp: new Date().toISOString(),
    });

    const res = await request(app).get(`/api/sleep/${userId}`);
    console.log('Get Sleep Records Response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it('should delete a sleep record by ID', async () => {
    const userRes = await request(app).post('/api/sleep/users').send({ username: 'testuser3' });
    console.log('User Response:', userRes.body);
    const userId = userRes.body.data._id;

    const sleepRes = await request(app)
      .post('/api/sleep')
      .send({
        userId,
        duration: 6,
        timestamp: new Date().toISOString(),
      });
    console.log('Add Sleep Record Response:', sleepRes.body);
    const recordId = sleepRes.body.data._id;

    const deleteRes = await request(app).delete(`/api/sleep/${recordId}`);
    console.log('Delete Sleep Record Response:', deleteRes.body);
    expect(deleteRes.statusCode).toBe(200);

    const getRes = await request(app).get(`/api/sleep/${userId}`);
    console.log('Get Sleep Records After Deletion Response:', getRes.body);
    expect(getRes.body.data).not.toContainEqual(expect.objectContaining({ _id: recordId }));
  });
});
