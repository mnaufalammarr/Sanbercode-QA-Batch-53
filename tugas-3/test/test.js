const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

// Import aplikasi atau file yang berisi aplikasi Anda
const app = "https://kasir-api.belajarqa.com"; // Pastikan untuk menyesuaikan path dengan aplikasi Anda

// Contoh token otentikasi
let authToken = '';

describe('Authentication API', function() {
    it('POST /register should register a new user', function(done) {
        const userData = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword'
        };

        request(app)
            .post('/register')
            .send(userData)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    // Login sebelum setiap pengujian dimulai
    before(function(done) {
        const loginData = {
            username: 'testuser',
            password: 'testpassword'
        };

        request(app)
            .post('/login')
            .send(loginData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('token');
                authToken = res.body.token; // Simpan token untuk pengujian
                done();
            });
    });

    
});
describe('Unit API', function() {
    let unitId;

    it('GET /units should return list of units', function(done) {
        request(app)
            .get('/units')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('POST /units should create a new unit', function(done) {
        const unitData = {
            name: 'Test Unit',
            description: 'Test unit description'
        };

        request(app)
            .post('/units')
            .set('Authorization', `Bearer ${authToken}`)
            .send(unitData)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Test Unit');
                unitId = res.body._id; // Simpan id unit untuk pengujian selanjutnya
                done();
            });
    });

    it('GET /units/:id should return the specified unit', function(done) {
        request(app)
            .get(`/units/${unitId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('_id', unitId);
                done();
            });
    });

    it('PUT /units/:id should update the specified unit', function(done) {
        const updatedUnitData = {
            name: 'Updated Test Unit',
            description: 'Updated test unit description'
        };

        request(app)
            .put(`/units/${unitId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedUnitData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Updated Test Unit');
                done();
            });
    });

    it('DELETE /units/:id should delete the specified unit', function(done) {
        request(app)
            .delete(`/units/${unitId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

// Pengujian untuk endpoint /categories
describe('Category API', function() {
    let categoryId;

    it('GET /categories should return list of categories', function(done) {
        request(app)
            .get('/categories')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('POST /categories should create a new category', function(done) {
        const categoryData = {
            name: 'Test Category',
            description: 'Test category description'
        };

        request(app)
            .post('/categories')
            .set('Authorization', `Bearer ${authToken}`)
            .send(categoryData)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Test Category');
                categoryId = res.body._id; // Simpan id kategori untuk pengujian selanjutnya
                done();
            });
    });

    it('GET /categories/:id should return the specified category', function(done) {
        request(app)
            .get(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('_id', categoryId);
                done();
            });
    });

    it('PUT /categories/:id should update the specified category', function(done) {
        const updatedCategoryData = {
            name: 'Updated Test Category',
            description: 'Updated test category description'
        };

        request(app)
            .put(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedCategoryData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Updated Test Category');
                done();
            });
    });

    it('DELETE /categories/:id should delete the specified category', function(done) {
        request(app)
            .delete(`/categories/${categoryId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

// Pengujian untuk endpoint /customers
describe('Customer API', function() {
    let customerId;

    it('GET /customers should return list of customers', function(done) {
        request(app)
            .get('/customers')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('POST /customers should create a new customer', function(done) {
        const customerData = {
            name: 'Test Customer',
            email: 'test@example.com',
            // other fields
        };

        request(app)
            .post('/customers')
            .set('Authorization', `Bearer ${authToken}`)
            .send(customerData)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Test Customer');
                customerId = res.body._id; // Simpan id customer untuk pengujian selanjutnya
                done();
            });
    });

    it('GET /customers/:id should return the specified customer', function(done) {
        request(app)
            .get(`/customers/${customerId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('_id', customerId);
                done();
            });
    });

    it('PUT /customers/:id should update the specified customer', function(done) {
        const updatedCustomerData = {
            name: 'Updated Test Customer',
            email: 'updated_test@example.com',
            // other fields
        };

        request(app)
            .put(`/customers/${customerId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedCustomerData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Updated Test Customer');
                done();
            });
    });

    it('DELETE /customers/:id should delete the specified customer', function(done) {
        request(app)
            .delete(`/customers/${customerId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});

// Pengujian untuk endpoint /products
describe('Product API', function() {
    let productId;

    it('GET /products should return list of products', function(done) {
        request(app)
            .get('/products')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('POST /products should create a new product', function(done) {
        const productData = {
            name: 'Test Product',
            price: 10.99,
            // other fields
        };

        request(app)
            .post('/products')
            .set('Authorization', `Bearer ${authToken}`)
            .send(productData)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Test Product');
                productId = res.body._id; // Simpan id product untuk pengujian selanjutnya
                done();
            });
    });

    it('GET /products/:id should return the specified product', function(done) {
        request(app)
            .get(`/products/${productId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('_id', productId);
                done();
            });
    });

    it('PUT /products/:id should update the specified product', function(done) {
        const updatedProductData = {
            name: 'Updated Test Product',
            price: 15.99,
            // other fields
        };

        request(app)
            .put(`/products/${productId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedProductData)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('name', 'Updated Test Product');
                done();
            });
    });

    it('DELETE /products/:id should delete the specified product', function(done) {
        request(app)
            .delete(`/products/${productId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
