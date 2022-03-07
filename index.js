const express = require('express');
//Mongoose nous facilite les opérations sur mongoDB
const mongoose = require('mongoose');
//On utilise winston pour log les erreurs en console et en fichier
const winston = require('winston');
const app = express();

require('dotenv').config();

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const booksRoute = require('./routes/books');

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

//create a logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({ filename: 'error.log', level:'error'}),
    ],
    exceptionHandlers:[
        new winston.transports.File({ filename: 'exeption.log'}),
    ]
})

//routes

app.use('/api/books', booksRoute);
app.get('/', (req,res) => {
    res.send(req.oidc.isAuthenticated() ? 'Connecté' : 'Non connecté');
})

//Pour log des exeptions
//throw new Error();

//Connect to mongoDBAtlas
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true})
.then(() => {
    logger.log("info", "Connected to mongoDB");
}).catch((error) => { 
    logger.log("error", "La connexion à la BDD a échoué");
});

//Start server
app.listen(PORT, () => {
    logger.warn(`Server started at port ${PORT}`);
});
