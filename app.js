const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const esj = require('ejs');
const app = express();
const dotenv = require('dotenv');
const db = require('./config/db');
const photoContollers = require('./controllers/photoControllers');
const pageContollers = require('./controllers/pageControllers');
dotenv.config();

const myLogger = (req, res, next) => {
  console.log('Middleware Log 1');
  next();
};

const myLogger2 = (req, res, next) => {
  console.log('Middleware Log 2');
  next();
};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(fileUpload());
app.use(methodOverride('_method'));

app.use(myLogger);
app.use(myLogger2);

app.get('/', photoContollers.getAllPhotos);
app.get('/photos/:id', photoContollers.getPhoto);
app.post('/photos', photoContollers.createPhoto);
app.put('/photos/:id', photoContollers.updatePhoto);
app.get('/photos/delete/:id', photoContollers.deletePhoto);

app.get('/about', pageContollers.getAboutPage);

app.get('/add', pageContollers.getAddPage);

app.get('/photos/edit/:id', pageContollers.getEditPage);

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
