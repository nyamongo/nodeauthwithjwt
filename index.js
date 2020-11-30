const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import routes
const authRoute = require('./routes/auth');
const itemsRoute = require('./routes/todoitems');



dotenv.config();

//Connect db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true ,useUnifiedTopology: true},
()=> {console.log("Connected to db")}
);



//Middlewares
app.use(express.json());
//Route middlewares
app.use('/api/user',authRoute);
app.use('/api/todoitems',itemsRoute);

app.listen('3000', () => { console.log("Server listening at port 3000")})