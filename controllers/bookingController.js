let Booking = require('../models/bookingModel');
let Passenger = require('../models/passengerModel');

let Passengers = [];

exports.bookingInfo = function (req,res){
    let insurance =req.body.insurance != undefined ?1:0;
    req.session.booking = new Booking(req.body.dest,req.body.seats,insurance);

    req.session.dest = req.body.dest;
    req.session.seats = req.body.seats;
    req.session.insurance = req.body.insurance != undefined ?1:0;
    let booking = new Booking(req.session.dest,req.session.seats,req.session.insurance);
    res.render('passengersEncoding.ejs',{booking:booking});
}
 
exports.bookingPrice = function (req,res){
    let insurance =  req.body.insurance != undefined ?1:0;
    let seats = req.body.seats == null ? 0: req.body.seats; ;
    let booking = new Booking(req.body.dest,seats,insurance);
    let price = booking.getPrice()
    res.render('booking.ejs',{booking:booking,price:price,message:'Cout total de la réservation'});
} 

exports.passengersEncoding = function (req,res){
    for(let i = 0;i<req.session.seats;i++){
        if(req.session.seats ==1){
            Passengers.push(new Passenger(req.body.name,req.body.age));
            break;
        }
        Passengers.push(new Passenger(req.body.name[i],req.body.age[i]));
    };
    req.session.names = req.body.name;
    req.session.ages = req.body.age;
    res.render('validation.ejs',{booking:new Booking(req.session.dest,req.session.seats,req.session.insurance),passengers:Passengers});
} 

exports.bookingConfirmation = function (req,res){
    // stocker dans la bdd
    let connection = require('../db.js');


    let booking = new Booking(req.session.dest,req.session.seats,req.session.insurance);
    let numberPassengers = req.session.seats;

    // register booking
    connection.query(`INSERT INTO Booking (dest,seats,insurance,reservationId) VALUES ('${booking.dest}','${booking.seats}','${booking.insurance}','${booking.reservationId}') `, function(error,result){
        if(error){
            res.status(400).send(error);
            console.log(error);
        }else{
            console.log('Booking registered in db ');
            // res.render('confirmation.ejs');
        }
    });

    // register passengers
    // booking.passengers.forEach{
        
    // }
    for(let i = 0;i<numberPassengers;i++){
        connection.query(`INSERT INTO Passengers (name,age,fk_reservation) VALUES ('${Passengers[i].name}',${Passengers[i].age},'${booking.reservationId}')`, function(error,result){
            if(error){
                res.status(400).send(error);
            }else{
                console.log(`Passenger n°${i} registered in db`);
            }
        });
    }

    res.render('confirmation.ejs');
}

exports.cancelBooking = function (req,res){
    req.session.destroy();
    res.render('booking.ejs',{booking:new Booking('','',''),price:'',message:''});
} 