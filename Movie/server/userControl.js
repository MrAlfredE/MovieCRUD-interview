const UserProfile = require('./userProfile');
const nodemailer = require('nodemailer');
const MovieList = require('./movieList');
const mysqlUser = require('../config/db.config')
class UserControl{
    constructor(email, name = null, surname = null, password = null, admin = 0){
        this.email = email;
        this.User = new UserProfile(name,surname,email,password,admin);
        this.code = null
    }
    /*resest's password and send it to email*/
    resetPassword(){
        let p="";
        for(let i = 0; i < 8; i++ ){
            p =p+String.fromCharCode(Math.round(Math.random()*74+48))+"";
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            
            auth: {
            user: 'MPAUG2021@gmail.com',
            pass: 'w11dw11d'
            }
        });
        
        const mailOptions = {
            from: 'MPAUG2021@gmail.com',
            to: this.email,
            subject: 'Forgot Password',
            text: "New Password: "+p
        };

        transporter.sendMail(mailOptions,function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        this.code = p;
        return p;
        
    }
    /*checks code used to set password(old function)*/
    checkCode(code){
        if(code == this.code){
            code = null
            return 1;
        }
        return 0;
    }
    /*stores new user in database*/
    create(){
        var values = {name: this.User.name, surname: this.User.surname, email: this.email, password: this.User.password, admin: this.User.admin};
        mysqlUser.query('INSERT INTO user SET ?', values, (err, res) => {
            if (err){
                console.log(err);
                return 0;
            } 
            console.log(res)
            this.User.userId = res.insertId;
            return 1;
        });
        

    }
    /*updates user in database*/
    async update(name,surname,email,password,admin){
        var temp = await this.update_record(name,surname,email,password,admin);
        const values = {name: this.User.name, surname: this.User.surname, email: this.email, password: this.User.password, admin: this.User.admin};
        const add = {userId: this.User.userId};
        const data = [values,add];
        mysqlUser.query('UPDATE user SET ? WHERE ?', data, (err, res) => {
            if (err){
                console.log(err);
                return (0);
            }
            return 1;
        });
    }
    /*updates user helper function creates Updated User object to be stored*/
    update_record(name,surname,email,password,admin){
        return new Promise((resolve,reject)=>{
            this.User.name = name;
            this.User.surname = surname;
            this.User.email = email;
            this.User.password = password;
            this.User.admin = admin;
            console.log(this.User.admin)
            if(1){
                resolve(1);
            }
            else{
                reject(0);
            }
        });

    }

    /*password check*/
    Login(password){
        if(password == this.User.password){
            return 1;
        }
        return 0;
    }
    /*check if user is in database*/
    checkEmail(){
        var t;
        t = this.retreve().then((t)=>{
            if(t == 1){
                var p;
                console.log("user exists")
                return 1;
            }
            else{
                console.log("no such user exists")
                return 0;
            }
        });
        
    }
    /*retrieves user*/
    async retreve(){
        var res;
        res = await this.get_records();
        try{
            this.User.name = res[0].name;
            this.User.surname = res[0].surname;
            this.User.email = res[0].email;
            this.User.password = res[0].password;
            this.User.userId = res[0].userId;
            this.User.admin =res[0].admin; 
            return 1;
        }
        catch(err){
            return 0;
        }
          
    }
    /*helper fuction to get user*/
    get_records(){
        return new Promise((resolve,reject)=>{
            mysqlUser.query('SELECT * FROM user WHERE email = ?', this.email, (err, res) => {
                if (err){
                    console.log(err);
                    reject(err);
                } 
                resolve(res);
            });
        });
    }
    /*old test fuction*/
    save(){
        var values = {name: this.User.name, surname: this.User.surname, email: this.email, password: this.User.password, admin: 1};
        mysqlUser.query('INSERT INTO user SET ?', values, (err, res) => {
            if (err){
                console.log(err);
            } 
        });
    
    }

}
module.exports = UserControl;