require('./config/config')

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const {setup} = require('./routes/routes');
var bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');




const port = process.env.PORT || 3000;  
var app = express();
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

hbs.registerPartials(__dirname+'/views/Partials');
hbs.registerHelper('getCurrentYear',() => new  Date().getFullYear());
hbs.registerHelper('screamIT',(text,text2) => text.toUpperCase()+" "+text2.toLowerCase()); 
app.set('view engine','hbs');
app.use(express.static(__dirname+'/Public'));
app.use((req,res,next)=>{
    var now= new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + "\n",(err)=>{ if(err){console.log('unable to append');}});
    next();
});



const routes =  setup();
app.use(routes);


  
  

module.exports.app = app;

app.listen(process.env.PORT,()=>console.log("Server is up and running in port " + process.env.PORT ));



// var message=encodeURIComponent("message with OTP : 123456");
//"https://smsapi.engineeringtgr.com/send/?Mobile=9962980733&Password=sendsms&Message="+message+"&To=9962980733&Key=parthV04X9KEUuyptWmleYLw"


