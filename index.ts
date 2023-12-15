import express from 'express'
import route from './Route.js'
import session from 'express-session';
import './DB.js'
import bodyParser from 'body-parser';
import passport from 'passport';

const app = express()
const port = 8000

app.use(
    session({
      secret: 'secret-key', 
      resave: false,
      saveUninitialized: false,
    })
  );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', route)

app.listen(port, () => {
    console.log(`server start on port : ${port}`);
})