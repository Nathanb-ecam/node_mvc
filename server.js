var express = require('express');
const path = require('path');
let app = express();

app.use(express.static(path.join(__dirname,'public')));

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