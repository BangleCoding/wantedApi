

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let flash = require('connect-flash');
let session = require('express-session');
let bcrypt = require('bcryptjs');
let passport = require('./config/passport'); //1
let app = express();
const MONGO_DB = 'mongodb+srv://new_user:new_password@cluster0.iop52.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGO_DB);
let db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB Error:', err);
})

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/wantedApi'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});


app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

let port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:' +port);
});
