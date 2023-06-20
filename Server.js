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

function sendQuery(query){
    var x = con.query(query, function(error, result){
        if (error){
            console.log("error at sending query")
        }else{
            console.log("result = \n");
            result.forEach(element => {
                console.log(element)
            });
            result = JSON.parse(result);

            console.log("2:\n"+result)
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
        var query =
        "SELECT COALESCE(`users`.`Name`, `journals`.`Name`) AS `Name`, COALESCE( `users`.`password`, `journals`.`Password` ) AS `Password` FROM `Hermes`.`users` LEFT JOIN `Hermes`.`journals`"+
        " ON `Hermes`.`journals`.`Name` = `Hermes`.`users`.`Name` UNION SELECT COALESCE(`users`.`Name`, `journals`.`Name`) AS `Name`, COALESCE( `users`.`password`, `journals`.`Password` ) AS `Password`"+
        " FROM `Hermes`.`users` RIGHT JOIN `Hermes`.`journals` ON `Hermes`.`journals`.`Name` = `Hermes`.`users`.`Name`"+
        "WHERE ( `users`.`password` = '"+body.password+"' OR `journals`.`Password` = '"+body.password+"' ) AND( `users`.`Name` = '"+body["name/email"]+"' OR `users`.`Email` = '"+body["name/email"]+"'"+
        " OR `journals`.`Name` = '"+body["name/email"]+"' OR `journals`.`Email` = '"+body["name/email"]+"' ); ";

        var dbRes = sendQuery(query);
        if (dbRes.length>0){
            res.send(true);
            res.render('SamplePage.ejs');
        }else{
            res.send(false);
        }
        console.log("query res = \n"+dbRes);
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

