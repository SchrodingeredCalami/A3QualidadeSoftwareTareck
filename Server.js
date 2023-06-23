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

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views')); // default render pages directory.

app.use(express.static(path.join(__dirname,'staticAssets')));


app.post('/login',function(req,res){
    var body = '';
    req.on('data',function(data){
        body+=data;
    })

    // When the request ends    
    req.on('end',function(){
        body = JSON.parse(body);
        var query =
        "SELECT * FROM users WHERE (users.Name=? AND users.Password=?)";
        var values =
        [body.name,body.password];

        con.query(query, values,function(error, result){
            var jsonRes = {"result":Boolean};
            if (error){
                console.log("error at sending query");
            }else{
                if (result.length>0){
                    jsonRes.result=true;
                }else{
                    jsonRes.result=false;
                }
                res.send(jsonRes);
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

