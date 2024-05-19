import request from 'supertest';
import {app} from '../app.js';


// testing the add new sleep record API
describe('POST /api/sleep', () => {
    it('should create a new sleep record', async () => {
        const response = await request(app)
            .post('/api/sleep')
            .send({
                userId: 'test_user',
                duration: 8,
                timestamp: Date.now()
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        // Checking if sleep record properties are correct
        expect(response.body).toHaveProperty('userId', 'test_user');
        expect(response.body).toHaveProperty('duration', 8);
    });

    it('should return 400 if userId is missing', async () => {
        const response = await request(app)
            .post('/api/sleep')
            .send({
                duration: 8,
                timestamp: Date.now()
            });

        expect(response.status).toBe(400);
    });
});


// testing the get sleep records for user API
describe('GET /api/sleep/:userId', () => {
    it('should get sleep records for a user', async () => {
        const response = await request(app)
            .get('/api/sleep/test_user');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        // Check if sleep records have correct properties
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('_id');
            expect(response.body[0]).toHaveProperty('userId', 'test_user');
            expect(response.body[0]).toHaveProperty('duration');
        }
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request(app)
            .get('/api/sleep/non_existing_user_id');

        expect(response.status).toBe(404);
    });
});


//testing the delete sleep record api
describe('DELETE /api/sleep/:recordId', () => {
    it('should delete a sleep record', async () => {
        const response = await request(app)
            .delete('/api/sleep/record_id');

        expect(response.status).toBe(200);
        // Check if response message is correct
        expect(response.body).toHaveProperty('message', 'Sleep record deleted successfully');
    });

    it('should return 404 if sleep record does not exist', async () => {
        const response = await request(app)
            .delete('/api/sleep/non_existing_record_id');

        expect(response.status).toBe(404);
    });
});
