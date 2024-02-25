const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const app = "https://kasir-api.belajarqa.com";

describe('Authentication API', function() {
    let authToken = '';

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

    it('POST /login should log in the user and return authentication token', function(done) {
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
                authToken = res.body.token; // Simpan token untuk pengujian selanjutnya
                done();
            });
    });
});
