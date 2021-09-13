const mongoose = require('mongoose');
const Models = require('./models.js');

mongoose.connect('mongodb://localhost:27017/MyFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

const express = require('express'),
morgan = require('morgan');
const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
(bodyParser = require("body-parser")), (uuid = require("uuid"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
// require('./passport');

//use of logger module
app.use(morgan('common'));
//home page url
app.get('/', (req, res) => {
  res.send('Welcome to my-flix');
});

app.use(express.static('public'));


//Gets the data of one Movie by Title
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}),(req, res) => {
 Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send('Error: ' + err);
  });
});


//Gets the data of all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find()
  .then ((movies) => {
    res.status(201).json(movies);
  })
 .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//Gets the descripton of a specific Genre
app.get('/genres/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
 Genres.findOne({ Name: req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send('Error: ' + err);
  });
});

//Gets the data of Director's by Director
app.get('/directors/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
 Directors.findOne({ Name: req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send('Error: ' + err);
  });
});
//This is a read operation which gets all users
app.get('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  });
});

//Gets a user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send('Error: ' + err);
  });
});

//Creates the registration process for a new user
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username})
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
          .create({ 
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
    });
}); 

app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res ) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true}, //ensures the updated document is returned  
  (err, updatedUser) => {
    if(err) {
     console.error(err);
     res.status(500).send('Error: ' + err); 
    } else {
      res.json(updatedUser);
    }
  });
});

//Allow users to add a movie to their list of favorites
app.post('/users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username }, {
    $push: {FavoriteMovies: req.params.MovieID }
  },
  {new: true}, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err)
 {
   console.error(err);
   res.status(500).send('Error: ' + err);
 } else { 
 res.json(updatedUser);
 }
  });
});

//Allow users to delete a movie to their list of favorites
app.delete('/users/:Username/FavoriteMovies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username }, {
    $pull: {FavoriteMovies: req.params.MovieID }
  },
  {new: true}, //This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err)
 {
   console.error(err);
   res.status(500).send('Error: ' + err);
 } else { 
 res.json(updatedUser); 
 }
  });
});

//Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username})
    .then((user) => {
      if(!user) {res.status(400).send(req.params.Username + ' was not found');
      } else{res.status(200).send(req.params.Username + ' was deleted');
      }
  })
  .catch((err) =>{
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});





app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});