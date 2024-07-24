const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const {router} = require('./routes/users');
const {Reciperouter} = require('./routes/recipes');


const PORT = 8000;

const app = express();



app.use(express.json());
app.use(cors());


app.use('/auth',router);
app.use('/recipies',Reciperouter);

mongoose.connect(
    'mongodb://localhost:27017/Recipe'
);

app.listen(PORT,()=>console.log(`Server Is Run At ${PORT} PORT`));