var app = require('../index.js'),
	assert = require('assert'),
	chai = require('chai'),
	should = require('should'),
	request = require('supertest');

describe('POST /login', function() {
	it('logs user in', function(done) {
		request(app)
			.post('/api/auth/login')
			.send({email: 'istvanskeri@gmail.com', password: 'evensteven'})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err,res){
				res.status.should.equal(200);
				res.body.success.should.equal(true);
				done();
			});
	});
});
