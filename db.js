var mysql=require('mysql');


var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ecam1234!',
    database:'ecam_air'
});

connection.connect(function(error){if(error)console.log(error)});


module.exports = connection;