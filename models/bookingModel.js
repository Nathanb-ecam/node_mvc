const crypto = require('crypto');

class Booking{
    constructor(dest,seats,insurance,id){
        this.dest = dest;
        this.seats = seats;
        this.insurance = insurance;
        this.reservationId = crypto.randomBytes(32).toString('hex');
        this.passengers = []
    }
    getPrice(){
        return this.seats * 45 + this.insurance * 20 ;
    }
}

module.exports = Booking;