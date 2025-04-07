const express = require('express');
const session = require('express-session');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const methodOveride = require('method-override');
const morgan = require('morgan');
const port = 3000;
const path = require('path');
const User = require('./models/User.js');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOveride('_method'));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 1 * 24 * 60 * 60,
        autoRemove: 'native',
    })
}));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MonogoDB ${mongoose.connection.name}`);
});

const authController = require('./controllers/auth.js');
const ticketController = require('./controllers/ticket.js');
const Character = require('./models/Character.js');

app.get('/', async (req, res) => {
    if(req.session.user){
        const savedUser = await User.findById({_id: req.session.user._id});
        const characters = [];
        for(char of savedUser.characters){
            const userChar = await Character.findById({_id: char})
            characters.push(userChar)
        }
        res.render('index.ejs',{
                characters: characters,
                turnCost: savedUser.turnCost,
                user: req.session.user
            }
        );
    } else {
        const characters = [];
        res.render('index.ejs',{
            user: req.session.user
        });
    }
});

app.use('/auth', authController);
app.use('/ticket', ticketController);

app.listen(port, () =>
console.log(`Server listening on port ${port}`));

