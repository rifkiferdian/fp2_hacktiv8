require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const authentication = require('./middlewares/authentication');
const usersRouter = require('./routes/users');
const photosRouter = require('./routes/photos');

app.get("/", async (req, res) => {
    const data = {
            kelompok : 3,
    }
    res.status(200).json({'Final Project 2 Hacktiv8':data});
});
app.use('/users', usersRouter);

app.use(authentication);
app.use('/photos', photosRouter);


app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});