const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const URL = "mongodb+srv://BookRecommendation:BookRecommendation@cluster0.txctacb.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(URL)
    console.log("connect with mongo");

  } catch (error) {
    console.log(`Error->${error}`)
  }
};

connect();


app.use(cors());

app.use(express.json());

const userRouter = require('./rotues/Users')
app.use('/auth', userRouter);

const loginRouter = require('./rotues/Logins')
app.use('/login', loginRouter);

const displayRouter = require('./rotues/DisplayData')
app.use('/displayItem', displayRouter);

const bookDetailRouter = require('./rotues/BooksDetails')
app.use('/bookdetail', bookDetailRouter)

const reviewRouter = require('./rotues/Review')
app.use('/review', reviewRouter)

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
}); 
