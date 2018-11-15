const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;
const {Vote} = require('./db/models/vote');

const vote = {
    "IdentityId" : "ADHR999",
	"PartyId"	: "TEST001",
	"location"	: 000000,
	"center"	: "PLC000"
};


describe('Checking app',()=>{

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

    request(app).post('/vote')
    .send(vote)
    .expect(200)
    /*.expect((res)=>{
        console.log("response1:"+res);
        //expect(res.body.IdentityId).toBe("ADHR999");
        //console.log(res.body);
    })*/
    .then((res) =>{
        //console.log("\nInside success"+ res.body.IdentityId);
        expect(res.body.IdentityId).toBe("ADHR999");
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

