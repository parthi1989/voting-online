const request = require('supertest');
const expect = require('expect');
const rewire = require('rewire');


var spyapp  = rewire('./utils');
    var db = {
        saveUser : expect.createSpy()
     };
     spyapp.__set__('db',db);
        
    it('Testing with spies',() => {

        

        spyapp.AddUser({name:"parthi",mobile:9962980733});
        
        expect(db.saveUser).toHaveBeenCalledWith({name:"parthi",mobile:9962980733,country:"India"});
    });

