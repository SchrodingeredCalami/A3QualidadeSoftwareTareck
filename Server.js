// remember: it's a POC. You just have to share the vision.

const express = require('express');
const path = require('path');
const mysql = require('mysql');

var app = express();
var socket = 3000;

var con = mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:""
})

app.use(express.static(path.join(__dirname+'/views')));

function sendQuery(query){
    var x = con.query(query, function(error, result){
        if (error){
            console.log("error at sending query")
        }else{
            console.log(query+'\n\n\n'+result);
            return result;
        } throw error;
    });
    console.log("Query sent");
    return x;
}

app.set('view engine', 'ejs');


// Still don't know how to read the results...?
app.post('/login',function(req,res){
    var body = "";
    req.on('data',function(data){
        body+=data;
    })

    // When the request ends    
    req.on('end',function(){
        body = JSON.parse(body);
        // trying to make a full join
        var query = "SELECT * FROM `Hermes`.`users` FULL OUTER JOIN `Hermes`.`journals` ON"+
        "`Hermes`.`journals`.`Name`,`Hermes`.`users`.`Name`"+
        " WHERE `password`='"+body.password+"' AND (`Name`='"+body["name/email"]+"' OR `Email`='"+body["name/email"]+"');";
        var dbRes = sendQuery(query);
        if (dbRes.length>0){
            res.send(true);
            res.render('SamplePage.ejs');
        }else{
            res.send(false);
        }
        console.log("stuff = "+dbRes);
    })
    
})

app.get('/',function(req,res){
    res.render('Login.ejs');
})

app.get('/main', function(req,res){
    res.render('SamplePage.ejs');
})

app.listen(socket);

console.log("online in socket = "+socket)

