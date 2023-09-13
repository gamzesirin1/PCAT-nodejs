const express = require('express');
const esj = require('ejs');
const path = require('path');
const app = express();
const Photo = require('./models/Photo');
const dotenv = require('dotenv');
const db = require('./config/db');

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
app.use(myLogger);
app.use(myLogger2);

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  // async - await yapısı kullanacğız.
  await Photo.create(req.body); // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/');
});

const PORT = process.env.PORT || 5000;

db();

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda başlatıldı.`);
});
