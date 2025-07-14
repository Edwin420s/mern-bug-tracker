const request = require('supertest');
const app = require('../../src/server');
const Bug = require('../../src/models/Bug');

describe('Bug Routes Integration Tests', () => {
  let testBug;

  beforeEach(async () => {
    // Create a test bug before each test
    testBug = await Bug.create({
      title: 'Test Bug',
      description: 'Test Description',
      status: 'open'
    });
  });

  describe('GET /api/bugs', () => {
    it('should fetch all bugs', async () => {
      const response = await request(app)
        .get('/api/bugs')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0]).toHaveProperty('title');
    });
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug', async () => {
      const newBug = {
        title: 'New Test Bug',
        description: 'New Test Description',
        status: 'open'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(newBug)
        .expect(201)
        .expect('Content-Type', /json/);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(newBug.title);
      expect(response.body.description).toBe(newBug.description);
    });

    it('should return 400 for invalid bug data', async () => {
      const invalidBug = {
        description: 'Missing title'
      };

      await request(app)
        .post('/api/bugs')
        .send(invalidBug)
        .expect(400);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    it('should update an existing bug', async () => {
      const updates = {
        title: 'Updated Title',
        status: 'in-progress'
      };

      const response = await request(app)
        .put(`/api/bugs/${testBug._id}`)
        .send(updates)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body.title).toBe(updates.title);
      expect(response.body.status).toBe(updates.status);
    });

    it('should return 404 for non-existent bug', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      await request(app)
        .put(`/api/bugs/${nonExistentId}`)
        .send({ title: 'Updated' })
        .expect(404);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    it('should delete an existing bug', async () => {
      await request(app)
        .delete(`/api/bugs/${testBug._id}`)
        .expect(200);

      // Verify it's actually deleted
      const deletedBug = await Bug.findById(testBug._id);
      expect(deletedBug).toBeNull();
    });

    it('should return 404 for non-existent bug', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011';
      await request(app)
        .delete(`/api/bugs/${nonExistentId}`)
        .expect(404);
    });
  });
});