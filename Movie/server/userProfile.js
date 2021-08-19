class UserProfile { 
    /*User constuctor users by default don't have admin rights*/
    constructor(name,surname, email, password, userId, admin = 0){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.admin = admin;
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
module.exports = UserProfile;
