const Movie = require('./movie');
const mysqlMovie = require('../config/db.config')
class MovieList{
    /*list constuctor*/
    constructor(userId,admin = 0){
        this.userId = userId;
        this.admin = admin;
        this.list =[]

    }
    /*inserts Movie record into mySQL database*/
    async create(name,discript, duration,  year, imagePath){
        var temp = await this.record_create(name,discript, duration, movieId, year, imagePath);
        var index = this.list.length-1;
        const values = {name: this.list[index].name, discription: this.list[index].discript, duration: this.list[index].duration, year: this.list[index].year, userId: this.userId, image: this.list[index].imagePath};
        mysqlUser.query('INSERT INTO user SET ?', values, (err, res) => {
            if (err){
                console.log(err);
                return 0;
            } 
            this.list[index].movieId= res.insertId;
            return 1;
        });
        

    }
    /*create helper which populates a movie object to send into database*/
    record_create(name,discript, duration, year, imagePath){
        
        return new Promise((resolve,reject)=>{
            this.list.push(new Movie(name,discript, duration, this.userId, year, imagePath))
            if(1){
                resolve(1);
            }
            else{
                reject(0);
            }
        });

    }
    /*updates Movie record into mySQL database*/
    async update(name,discript, duration, userId, movieId, year, imagePath){
        var temp = await this.update_record(name,discript, duration, userId, movieId, year, imagePath);
        const index = this.retreve(movieId);
        const values = {name: this.list[index].name, discription: this.list[index].discript, duration: this.list[index].duration, year: this.list[index].year, userId: this.list[index].userId, image: this.list[index].imagePath};
        const add = {movieId: this.list[index].movieId};
        const data = [values,add];
        mysqlUser.query('UPDATE user SET ? WHERE ?', data, (err, res) => {
            if (err){
                console.log(err);
                return (0);
            }
            return 1;
        });
    }
    /*update helper which populates a movie object to send into database*/
    update_record(name,discript, duration, userId, movieId, year, imagePath){
        
        return new Promise((resolve,reject)=>{
            const index = this.retreve(movieId);
            this.list[index].name = name;
            this.list[index].discript = discript;
            this.list[index].duration = duration;
            this.list[index].userId = userId;
            this.list[index].year = year;
            this.list[index].imagePath = imagePath;
            if(1){
                resolve(1);
            }
            else{
                reject(0);
            }
        });

    }
    /*deletes movie object from list*/
    async delete(movieId){

        var temp = await this.update_record(movieId);
        this.list.splice(this.retreve(movieId,1));

    }
    /*deletes movie object from database*/
    delete_record(movieId){
        return new Promise((resolve,reject)=>{
            const index = this.retreve(movieId);
            const add = {movieId: movieId};
            mysqlUser.query('DELETE FROM customers WHERE ?', add, (err, res) => {
                if (err){
                    console.log(err);
                    reject (0);
                }
                resolve (1);
            });
        });
    }
    /*retrieves movie object from list*/
    retreve(movieId){
        for(let i = 0; i<this.list.length;i++){
            if(this.list[i].movieId === movieId){
                return i;
            }
        }
        return -1;
    }
    /*populates list with Movie objects*/
    async listMovies(){
        var res;
        res = await this.get_records();
        try{
            console.log(res.length)
            for(let i = 0; i<res.length;i++){
                this.list.push(new Movie(res[i].name,res[i].discription, res[i].duration, res[i].userId, res[i].movieId,res[i].year, res[i].image));

            }
            return 1;
        }
        catch(err){
            return 0;
        }
          
    }
    /*retrive movie records from database*/
    get_records(){
        if(this.admin == 1){//admin user gets full access
            return new Promise((resolve,reject)=>{
                mysqlMovie.query('SELECT * FROM movie', this.userId, (err, res) => {
                    if (err){
                        console.log(err);
                        reject(err);
                    }
                    resolve(res);
                });
            });
        }
        else{
            return new Promise((resolve,reject)=>{
                mysqlMovie.query('SELECT * FROM movie WHERE userId = ?', this.userId, (err, res) => {
                    if (err){
                        console.log(err);
                        reject(err);
                    }
                    resolve(res);
                });
            });


        }
    }
    
}
module.exports = MovieList;