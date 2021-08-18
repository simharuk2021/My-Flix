const express = require('express'),
  morgan = require('morgan');

const app = express();
let topMovies = [
  {
    Title: 'Midway',
    Director: 'Roland Emmerich',
    Genre: 'War'
  },
  {
    Title: 'Inception',
    Director: 'Christopher Nolan',
    Genre: 'Thriller'
  },
  {
   Title: 'Tenet',
    Director: 'Christopher Nolan',
    Genre: 'Science Fiction'
  },
   {
   Title: 'The Departed',
    Director: 'Martin Scorsese',
    Genre: 'Crime'
  },
  {
    Title: 'Dumb and Dumber 2',
    Director: 'Bobby Farrelly',
    Genre: 'Comedy'
  },
  {
    Title: 'Happy Gilmore',
    Director: 'Dennis Dugan',
    Genre: 'Comedy'
  },
  {
    Title: 'The Wolf of Wall Street',
    Director: 'Martin Scorsese',
    Genre: 'Crime'
  },
   {
    Title: 'The Greatest Showman',
    Director: 'Michael Gracey',
    Genre: 'Drama'
  },
   {
    Title: 'Top Gun',
    Director: 'Tony Scott',
    Genre: 'War'
  },
   {
    Title: 'Godzilla',
    Director: 'Gareth Edwards',
    Genre: 'Science Fiction'
  }
];

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my-flix');
});

app.use(express.static('public'));

// Gets the list of data about ALL movies

app.get('/topMovies', (req, res) => {
  res.send('Successful GET request returning data on all the movies') ;
});

//Gets the data of one Movie by Title
app.get('/topMovies/:Title', (req, res) => {
  res.send('Successful GET request returning data on one movie by Title') ;
});

//Gets the data of Movies by Genre
app.get('/topMovies/Genre/:Title', (req, res) => {
  res.send('Successful GET request returning movies by Genre') ;
});

//Gets the data of Director's by Director
app.get('/Director', (req, res) => {
  res.send('Successful GET request returning Directors details') ;
});

//Creates the registration process for a new user
app.post('/users', (req, res) => {
  res.send('Successful text message sent indicating new user has registered ') ;
});

//Allow users to update their user info (username)
app.put('/users', (req, res) => {
  res.send('Successful text message sent indicating user details have been changed') ;
});

//Allow users to add a movie to their list of favorites
app.put('/users/:favourite', (req, res) => {
  res.send('Successful text message sent indicating favourite movie has been added') ;
});

//Allow users to delete a movie to their list of favorites
app.delete('/users/:favourite', (req, res) => {
  res.send('Successful text message sent indicating favourite movie has been deleted') ;
});

//Allow users to deregister
app.delete('/users', (req, res) => {
  res.send('Successful text message sent indicating user has deregistered') ;
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});