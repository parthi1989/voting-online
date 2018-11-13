const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Checking app',()=>{

    it ('Should get help page',(done)=>{
        request(app).get('/help.html')
        .expect(200)
        .end(done());
    });
    
});