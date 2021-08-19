const UserControl = require('./server/userControl');
const express = require('express');
const MovieList = require('./server/movieList');

var app = express();
var User1;
var Movielist1;


app.get('/login',function(req,res) {
    User1 = new UserControl(req.email);
    var real = User1.checkEmail();
    if(real){
        logged = User1.Login(req.password);
        if(logged == 1){
            MovieList1 = new MovieList(User1.User.userId,User1.User.admin)
            res.json({Errorcode: 1,name: User1.name, surname: User1.surname})//User1.User
        }
        else{
            User1 = Null;
            res.send();//wrong password login error
        }
        
    }
    else{
        User1 = Null;
        res.send();//non real email error
    }
    
});

app.post('/login',function(req,res) {
    var code = req.postcode;
    if(code == 0){
        User1 = new UserControl(req.email,req.name,req.surname,req.password,req.admin);
        var real = User1.checkEmail();
        if(real == 0){
            User1.create();
            res.send()//ok
        } 
        else{
            res.send()//user real
        }
    }
    else if(code == 1){
        User1 = new UserControl(req.email);
        var real = User1.checkEmail();
        if(real == 1){
            var resetCode = User1.resetPassword();
            User1.update(User1.User.name,User1.User.surname,User1.User.email,resetCode,User1.User.admin).then((num)=>{
                res.send();//ok
            });     
            //res.send();//resetcode
        }
        else{
            User1 = Null;
            res.send();//non real email error
        }
    }
    else if(code == 2){
        resetCode = req.resetCode;
        var resetcode = User1.code;
        if(resetcode == 1){
            User1.update(User1.User.name,User1.User.surname,User1.User.email,req.password,User1.User.admin).then((num)=>{
                res.send();//ok
            });     
        }
        else{
            res.send()//incorrect code error
        }
        
    }
    else{
        res.send()//unkown error
    }

});

app.delete('/list',function(req,res){
    MovieList1.delete(req.movieId).then(()=>{
        res.send()//ok and updated list
    });
});




app.get('/list',function(req,res){
    MovieList1.listMovie().then(()=>{
        res.send();//ok and send list
    });
});

app.post('/list',function(req,res){
    var code = req.postcode;
    if(code == 0){
        MovieList1.create(req.name,req.discript,req.duration,req.year,req.path).then(()=>{
            res.send();//ok and send list
        });
    }
    else if(code == 1){
        MovieList1.update(req.name,req.discript,req.duration,req.year,req.image).then(()=>{
            res.send();//ok and send list
        });
    }
    else{
        res.send();//unknown error
    }
});

var server = app.listen(8081,()=>{
    console.log('Server Listening on port 8081')

});