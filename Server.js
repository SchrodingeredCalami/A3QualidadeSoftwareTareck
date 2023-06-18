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


// Still don't know how to read the results
app.post('/login',function(req,res){

})

app.get('/', function(req,res){
    res.render('SamplePage.ejs');
})

app.listen(socket);

console.log("online in socket = "+socket)