const request = require('supertest-as-promised');
const chai = require('chai');
const { expect } = chai;
const app = require('../src');

describe('API v1', () => {
	describe('GET /heartbeat', () => {
	  it('responds with a status: ok', () =>
	    request.agent(app).get('/api/v1/heartbeat')
	      .set('Accept', 'application/json')        
	      .expect(200)          
	      .then(res => expect(res.body).to.contain({
	        ok: true
	      }))
	  )      
	});
});

describe('Server', () => {
	describe('GET /healthcheck', () => {
	  it('responds with a status: ok', () =>
	    request.agent(app).get('/healthcheck')
	      .expect(200)
	  )      
	});
});
