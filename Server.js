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
            var jsonRes = {};
            if (error){
                console.log("error at sending query");
            }else{
                if (result.length=1){
                    jsonRes.result=true;
                    jsonRes.ID=result[0].ID;
                    jsonRes.Auth=result[0].Auth;
                }else{
                    jsonRes.result=false;
                }
                console.log(JSON.stringify(jsonRes));
                res.send(jsonRes);
            }
        })
    })
})

app.post('/newPost', function(req,res){
    var body = '';
    req.on('data',function(data){
        body+=data;
    })

    // When the request ends    
    req.on('end',function(){
        body = JSON.parse(body);
        if(body.Auth>0){
            var query = "INSERT INTO `posts`(`Content`,`JournalID`) VALUES (?,?)";
            var values = [body.Content, body.ID];

            con.query(query,values,function(err){
                if(err){
                    console.log("unable to make the post\n"+err);
                    res.send(false);
                }else{
                    res.send(true);
                }
            })
        }else{
            console.log("invalid post");
            res.send(false);
        }
        
    })
})

app.post('/getPost', (req,res)=>{
    var body = '';
    req.on('data',(data)=>{
        body+=data;
    })

    // When the request ends    
    req.on('end',()=>{
        var query = "SELECT * FROM `posts` WHERE `Created`<(Select `Created` from `posts` WHERE `PostID` = ?) LIMIT 10";
        var values = [body];// this body needs to be the oldest post

        con.query(query,values,(err, qres)=>{
            if(err){
                res.send(false);
            }else{
                res.send(JSON.stringify(qres));
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

