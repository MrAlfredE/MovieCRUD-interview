class Movie { 
    /*Movie constuctor requires all fields but imagePath*/
    constructor(name,discript, duration, userId, movieId, year, imagePath = null){
        this.name = name;
        this.discript = discript;
        this.imagePath = imagePath;
        this.duration = duration;
        this.movieId = movieId;
        this.year = year;
        this.userId = userId;
    }
    /*getter*/
    get __value(){
        return this.__value;
    }
    /*setter*/
    set __value(val){
        this.__value = val;

    } 
    
    

} 

module.exports = Movie;