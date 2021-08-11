const express = require('express'),
  morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Midway',
    Director: 'Roland Emmerich'
  },
  {
    title: 'Inception',
    Director: 'Christopher Nolan'
  },
  {
   title: 'Tenet',
    Director: 'Christopher Nolan'
  },
   {
   title: 'The Departed',
    Director: 'Martin Scorsese'
  },
  {
    title: 'Dumb and Dumber 2',
    Director: 'Bobby Farrelly'
  },
  {
    title: 'Happy Gilmore',
    Director: 'Dennis Dugan'
  },
  {
    title: 'The Wolf of Wall Street',
    Director: 'Martin Scorsese'
  },
   {
    title: 'The Greatest Showman',
    Director: 'Michael Gracey'
  },
   {
    title: 'Top Gun',
    Director: 'Tony Scott'
  },
   {
    title: 'Godzilla',
    Director: 'Gareth Edwards'
  }
];

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my-flix');
});

app.use(express.static('public'));

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});