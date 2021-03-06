const express = require ('express');
//const stripe = require("stripe")(keySecret);
const app = express();
const cors = require('cors');
const db = require('./model/db.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
//const {mongoose}= require('./database');
//Settings
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.use(cookieParser());
app.use(flash());

/*app.use(function(req, res, next) {
  if(req.session.user)
  res.locals.user = req.session.usuario;
  next();
});
*/

app.listen(port);

//Middlewares
//app.use(cors());
//app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
//app.use(morgan('dev'));
//app.use(express.json());
app.use(express.urlencoded());

app.set('views', __dirname +'/view/');
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use('/uploads', express.static(__dirname + '/uploads'));

//session
//app.use(session({secret: "Shh, its a secret!"}));

//Routes
//app.use('/api/usuario',require('./routes/usuario.route'));
//app.use('/api/evento',require('./routes/evento.route'));
//app.use('/api/ticket',require('./routes/ticket.route'));



const usuarios = require('./routes/usuarios.route')(app);
const perfil =   require('./routes/perfil.route')(app);
const historias = require('./routes/historias.route')(app);
const comentarios = require('./routes/comentarios.route')(app);
const categorias = require('./routes/categorias.route')(app);


app.use('/',require('./routes/index.route'));


// Configurar cabeceras y cors
//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//    next();
//});



//Starting the server
app.listen(app.get('port'), ()=> {
    console.log('Server on port', port);
});