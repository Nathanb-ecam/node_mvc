var express = require('express');
let app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));


let session = require('express-session');
app.use(session({
    secret:'my_secret',
    resave:false,
    saveUninitialized:true,
}))

let routes = require('./routes');
app.use('/',routes);



app.listen(3000,()=>{
    console.log("Serveur démarré ...");
})