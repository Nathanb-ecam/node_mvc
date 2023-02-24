class Passenger{
    constructor(name,age){
        this.name = name;
        this.age = age ==  '' ? 0 : parseInt(age);
    }
}


module.exports = Passenger;