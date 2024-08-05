const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let server;

describe('Product API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    server = app.listen(3001);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('products');
  });

  it('should get a single product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('product');
  });

  it('should create a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('product');
  });

  it('should update a product', async () => {
    const res = await request(app)
      .patch('/api/products/1')
      .send({
        name: 'Updated Product',
        description: 'Updated Description',
        price: 15,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('product');
  });

  it('should delete a product', async () => {
    const res = await request(app).delete('/api/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted');
  });
});
