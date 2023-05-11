
const express = require('express'); 
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express(); 
const port = 8000; 
const passport = require('passport');
const passportLocal = require('./config/passport-local');


const MongoStore = require('connect-mongo');

// they are used for showing action notifications
const flash = require('connect-flash'); 
const flashMiddleWare = require('./config/flashMiddleware');


app.use(bodyParser.urlencoded({extended:false}));
// For using the file in assets folder.
app.use(express.static('./assets'));

// Setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(expressLayout);

// mongo store is used to store the session cookie in the db 
app.use(session({
    name: "ERS",
    
    secret: "employeeReviewSystem",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://rp9665703458:Pass@cluster0.zqfdouy.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(flashMiddleWare.setFlash);


app.use('/' , require('./routes/index') );



app.listen(port, function(err){
    if(err){
        console.log("Error in running the app.");
        return ;
    }
    console.log("Server is  running at port ", + port);
});