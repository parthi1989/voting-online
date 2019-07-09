const request = require('supertest');
const expect = require('expect');
const rewire = require('rewire');


var spyapp  = rewire('../utils');
    var db = {
        saveUser : expect.createSpy()
     };
     spyapp.__set__('db',db);

    const user = {
        "name" : "XXXXXX",
        "age" : 98,
        "location" : "000998",
        "IdentityId" : "TEST997",
        "mobile": 1000000001,
        "email": "abd@gmail.com",
        "password": "aaaaaaaaaaaaaaaaaaaaaaaa"
    }
    
    it('Testing with spies',(done) => {

        

        spyapp.AddUser(user);
        
        expect(db.saveUser).toHaveBeenCalledWith(user);
        done();
        //console.log("Ending test");
    });
