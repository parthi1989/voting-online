const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');


var app = require('./server').app;
const {Vote} = require('./db/models/vote');
const {User} = require('./db/models/user');

const vote = {
    _id : new ObjectID(), 
    "IdentityId" : "TEST999",
	"PartyId"	: "TEST999",
	"location"	: 000999 ,
	"center"	: "PLC999"
};

const user = {
    _id : new ObjectID(),
    "name" : "XXXXXX",
    "age" : 99,
    "location" : 000999,
    "IdentityId" : "TEST998"
}

beforeEach((done) => {
    Vote.remove({}).then(() => {
      return Vote.insertMany(vote);
      done()
    }).then(() => done());
  });

describe('Checking app',() => {

    /*it ('Should get help page',(done)=>{
        request(app).get('/help.html')
        .expect(200)
        .end(done());
    });*/
/*
    
        .end((err,res) => {
            if(err) {
                return done(err);
            }
            else{
                 done();
            }
        }).catch((e)=> done(e))
    });
*/
/*
it ('Should get help page',(done)=>{
        request(app).get('/help.html')
        .expect(200)
        .end((err,res)=>{
            if(err) {
                return done(err);
            }
            else {
                done(); 
            }
        }).catch((e) => done(e) );
    }); 

*/
    
});

it ('create votes', (done) => {
    var tempvote = {
        "IdentityId": "TEST998",
        "PartyId"	: "TEST998",
        "location"	: 000998,
        "center"	: "PLC998"
    }; 

    request(app).post('/vote')
    .send(tempvote)
    .expect(200)
    /*.expect((res)=>{
        console.log("response1:"+res);
        //expect(res.body.IdentityId).toBe("ADHR999");
        //console.log(res.body);
    })*/
    .then((res) =>{
        //console.log("\nInside success"+ res.body.IdentityId);
        expect(res.body.IdentityId).toBe(tempvote.IdentityId);
        Vote.find(tempvote).then((votes)=>{
            console.log(votes.length);
            expect(votes.length).toBeGreaterThanOrEqualTo(1);
        });

        done();
    },(e)=>{
        //console.log("\nInside failiure");
        done(e);
    });

    //catch((e)=>console.log("catch promise "+e));
 /*   
    .end((err,res)=>{
        console.log("response2:"+res);
        if(err) {
            return done(err);
        }
        else{
            Vote.find({IdentityId:"ADHR999"}).then((votes)=>{
                expect(votes.length).toBe(1);
                done();
            }).

            done();
        }

    }).catch((e)=>done(e));
*/    
    
//console.log("\nEnding the tests");    
}
);

it ('create user', (done) => {

    request(app).post('/SaveUser')
    .send(user)
    .expect(200)
    .then((res) =>{
        expect(res.body._id).toBe(user._id.toHexString());
        done();
    },(e)=>{
        //console.log("\nInside failiure");
        done(e);
    });
}
);


describe('GET /fetchvotes', () => {
    it('should get all votes', (done) => {
      request(app)
        .get('/fetchvotes')
        .expect(200)
        .expect((res) => {
          expect(res.body.votes.length).toBeGreaterThanOrEqualTo(1);
        })
        .end(done);
    });
  });

  describe('GET /fetchuser/:IdentityId', () => {
    it('should get specified user', (done) => {
      request(app)
        .get('/fetchuser/TEST998')
        .expect(200)
        .expect((res) => {
          expect(res.body.users.length).toBeGreaterThanOrEqualTo(1);
        })
        .end(done);
    });
  });

  describe('DELETE /vote/:id', () => {
    it('should remove a vote', (done) => {
      var hexId = vote._id.toHexString();
  
      request(app)
        .delete(`/vote/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.vote._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
  
          Vote.findById(hexId).then((vote) => {
            expect(vote).toNotExist();
            done();
          }).catch((e) => done(e));
        });
    });
  });

  describe('PATCH /user/:id', () => {
    it('should update the user', (done) => {
      var hexId = user._id.toHexString();
      var location = 'xxxxxx';
        //console.log(`/user/${hexId}`);console.log({location});
        request(app)
        .patch(`/user/${hexId}`)
        .send({"location":"xxxxxx"})
        .expect(200)
        .then((res) => {
          //console.log(res);
          expect(res.body.user.location).toBe(location);
          expect(res.body.user.updatedAt).toBeA('number');
          done();
        },(e)=> done(e));
        
    });
});

  
