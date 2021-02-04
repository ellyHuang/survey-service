const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./models/survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

//create a new express application that is used to setup configuration listening to the incoming request
const app = express();


app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

//routing logic
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//configuration to make sure express work well in production mode
if (process.env.NODE_ENV === 'production'){
    //AUCTION!! THE ORDER MATTERS!!!

    const path = require('path');

    //make sure express will serve up production assets, like main.js or main.css
    app.use(express.static(path.join(__dirname, 'client/build')));

    //express will serve index.html file when it doesn't recognize the route, which means that route is basically handled by react-route
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);