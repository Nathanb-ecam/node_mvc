let Booking = require('../models/bookingModel');
let Passenger = require('../models/passengerModel');


exports.bookingInfo = function (req,res){
    let insurance =req.body.insurance != undefined ?1:0;
    req.session.booking = new Booking(req.body.dest,req.body.seats,insurance);
    res.render('passengersEncoding.ejs',{booking:req.session.booking});
}
 
exports.bookingPrice = function (req,res){
    let insurance =  req.body.insurance != undefined ?1:0;
    let seats = req.body.seats == null ? 0: req.body.seats; ;
    let booking = new Booking(req.body.dest,seats,insurance);
    let price = booking.getPrice()
    res.render('booking.ejs',{booking:booking,price:price,message:'Cout total de la réservation'});
} 

exports.passengersEncoding = function (req,res){
    let booking = req.session.booking;
    for(let i = 0;i<booking.seats;i++){
        if(booking.seats ==1){
            booking.passengers.push(new Passenger(req.body.name,req.body.age));
            break;
        }
        booking.passengers.push(new Passenger(req.body.name[i],req.body.age[i]));
    };

    res.render('validation.ejs',{booking:booking,passengers:booking.passengers});
} 

exports.bookingConfirmation = function (req,res){
    // stocker dans la bdd
    let connection = require('../db.js');
    let booking = req.session.booking;

    // register booking
    connection.query(`INSERT INTO Booking (dest,seats,insurance,reservationId) VALUES ('${booking.dest}','${booking.seats}','${booking.insurance}','${booking.reservationId}') `, function(error,result){
        if(error){
            res.status(400).send(error);
            console.log(error);
        }else{
            console.log('Booking registered in db ');
        }
    });


    for(let i = 0;i<booking.seats;i++){
        connection.query(`INSERT INTO Passengers (name,age,fk_reservation) VALUES ('${booking.passengers[i].name}',${booking.passengers[i].age},'${booking.reservationId}')`, function(error,result){
            if(error){
                res.status(400).send(error);
            }else{
                console.log(`Passenger ${booking.passengers[i].name} registered in db`);
            }
        });
    }

    res.render('confirmation.ejs');
}

exports.cancelBooking = function (req,res){
    req.session.destroy();
    res.render('booking.ejs',{booking:new Booking('','',''),price:'',message:''});
} 