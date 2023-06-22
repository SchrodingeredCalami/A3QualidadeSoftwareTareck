// remember: it's a POC. You just have to share the vision.

const express = require('express');
const path = require('path');
const mysql = require('mysql');

var app = express();
var socket = 3000;

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"doxlyn",
    database:"Hermes"
})

app.use(express.static(path.join(__dirname+'/views')));

app.set('view engine', 'ejs');


// Still don't know how to read the results...?
app.post('/login',function(req,res){
    var body = '';
    req.on('data',function(data){
        body+=data;
    })

    // When the request ends    
    req.on('end',function(){
        body = JSON.parse(body);
        var query =
        "SELECT * FROM users WHERE (users.Name='"+body.name+"' AND users.Password='"+body.password+"')";

        con.query(query,function(error, result){
            if (error){
                console.log("error at sending query");
            }else{
                console.log(query);
                if (result.length>0){
                    res.render('SamplePage.ejs');
                    console.log("got results\n");
                }else{
                    res.send(false);
                    console.log("no results\n");
                }
            }
        })
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

