let express = require('express');
let router = express.Router();

let bookingController = require('./controllers/bookingController');
let Booking = require('./models/bookingModel');



router.get('/',(req,res)=>{
    res.render('booking.ejs',{booking: new Booking('','',''),price:"",message:""});
});

router.post('/booking',bookingController.bookingInfo);

router.post('/totalPrice',bookingController.bookingPrice);

router.post('/encoding', bookingController.passengersEncoding);

router.post('/confirmation', bookingController.bookingConfirmation);

router.post('/cancel', bookingController.cancelBooking);


module.exports = router;