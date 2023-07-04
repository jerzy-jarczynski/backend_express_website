const express = require('express');
const path = require('path');

const app = express();

// middleware - views resources service
app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use('/user', (req, res) => {
  res.show('forbidden.html');
});

// middleware - publick resources service
app.use(express.static(path.join(__dirname, '/public')));

// routing
app.get('/', (req, res) => {
  res.show('home.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

// middleware - bad url service
app.use((req, res) => {
  res.status(404).show('404.html');
})

// creating server on port 8000
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});