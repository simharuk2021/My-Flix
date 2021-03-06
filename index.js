const mongoose = require('mongoose');
const Models = require('./models.js');

// mongoose.connect('mongodb://localhost:27017/MyFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI , { useNewUrlParser: true, useUnifiedTopology: true });


const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

const express = require('express'),
morgan = require('morgan');
const app = express();
app.use(express.json());

(bodyParser = require("body-parser")), (uuid = require("uuid"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const {check, validationResult } = require('express-validator');


const cors = require('cors');

let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', 'http://testsite.com, https://www.imdb.com/title/tt0117731/mediaviewer/rm348793344/'];

app.use(cors());

let auth = require('./auth')(app);

const passport = require('passport');

//use of logger module
app.use(morgan('common'));
//home page url
app.get('/', (req, res) => {
  res.send('Welcome to my-flix');
});

app.use(express.static('public'));


/**
 * @description Endpoint to get data for one movie by title.<br>
 * Requires authorization JWT.
 * @method GETMovie
 * @param {string} endpoint - /movies/:Title
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for one movie. 
 * {
 *   Genre: { Name: <string>, Description: <string> },  
 *   Director: { Name: <string>, Bio: <string>, Birth: <string> },  
 *   _id: <string>,  
 *   Title: <string>,  
 *   Description: <string>,  
 *   Featured: <boolean>,  
 *   ImagePath: <string> (example: "Inception.png"),  
 * }
 */
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


/**
 * @description Endpoint to get data for all movies.<br>
 * Requires authorization JWT.
 * @method GETAllMovies
 * @param {string} endpoint - /movies
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for all movies.
 *   Genre: { Name: <string>, Description: <string> },    
 *   Director: { Name: <string>, Bio: <string>, Birth: <string> },    
 *   _id: <string>,   
 *   Title: <string>,   
*   Description: <string>,   
 *   Featured: <boolean>,   
 *   ImagePath: <string> (example: "Inception.png"),  
 * ]}
 */
app.get('/movies',  passport.authenticate('jwt', {session: false}), 
function (req, res) 
// => 
{
  Movies.find()
  .then ((movies) => {
    res.status(201).json(movies);
  })
 .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});


/**
 * @description Endpoint to get info about a genre<br>
 * Requires authorization JWT.
 * @method GETGenre
 * @param {string} endpoint - /genres/:genre
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for one genre. 
 * { Name: <string>, 
 * Description: <string> }
 */
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

/**
 * @description Endpoint to get info about a director<br>
 * Requires authorization JWT.
 * @method GETDirector
 * @param {string} endpoint - /directors/:director
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for one director. 
 * { Name: <string>, 
 * Bio: <string>, 
 * Birth: <string> }
 */
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
/**
 * @description Endpoint to get data for all users.<br>
 * Requires authorization JWT.
 * @method GETusers
 * @param {string} endpoint - /users
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for all users. 
 * {[  _id: <string>,   
 *     Username: <string>,   
 *     Password: <string> (hashed),   
 *     Email: <string>,  
 *     Birthday: <string>  
 *     FavoriteMovies: [<string>]  
 * ]}  
 */
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

/**
 * @description Endpoint to get data for a user by username.<br>
 * Requires authorization JWT.
 * @method GETUser
 * @param {string} endpoint - /users/:Username
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing data for the user. 
 * { _id: <string>,   
 *   Username: <string>,   
 *   Password: <string> (hashed),   
 *   Email: <string>,  
 *   Birthday: <string>  
 *   FavoriteMovies: [<string>]  
 * }
 */
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOne({ Username: req.params.Username }).populate('FavoriteMovies')
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send('Error: ' + err);
  });
});

/**
 * @description Endpoint to add a new user<br>
 * Does not require authorization JWT.
 * @method POSTuserRegistration
 * @param {string} endpoint - /users/Username
 * @param {req.body} object - The HTTP body must be a JSON object formatted as below (but Birthday is optional):<br>
 * {<br>
 * "Username": "simonhart",<br>
 * "Password": "horseRyder02",<br>
 * "Email" : "sigmail.com",<br>
 * "Birthday" : "01/01/2001"<br>
 * }
 * @returns {object} - JSON object containing data for the new user. 
 * { _id: <string>,  
 *   Username: <string>,  
 *   Password: <string> (hashed),  
 *   Email: <string>, 
 *   Birthday: <string>  
 *   FavoriteMovies: []  
 * }
 */
app.post('/users', 
//validation logic 
[check('Username' , 'Username is required').isLength({min:5}),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail(),
check('Birthday', 'Birthday should be in ISO format yyyy/mm/dd format').isDate()
], (req, res) => {
//check the object for validation errors
let errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username})
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
          .create({ 
            Username: req.body.Username,
            Password: hashedPassword,
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

app.put('/users/:Username', 

[check('Username' , 'Username is required').isLength({min:5}),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail(),
check('Birthday', 'Birthday should be in ISO format yyyy/mm/dd format').isDate()
],  passport.authenticate('jwt', {session: false}) 

   , (req, res ) => {
      
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
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

/**
 * @description Endpoint to add a movie to a user's favorites<br>
 * Requires authorization JWT.
 * @method POSTaddFavoriteMovies
 * @param {string} endpoint - /users/:Username/FavoriteMovies/:MovieID, null
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing updated user data. 
 * { _id: <string>,   
 *   Username: <string>,   
 *   Password: <string> (hashed),   
 *   Email: <string>,  
 *   Birthday: <string>  
 *   FavoriteMovies: [<string>]  
 * }  
 */
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

/**
 * @description Endpoint to remove a movie to a user's favorites<br>
 * Requires authorization JWT.
 * @method DELETEMovie
 * @param {string} endpoint - /users/:Username/FavoriteMovies/:MovieID
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} - JSON object containing updated user data. 
 * { _id: <string>,   
 *   Username: <string>,   
 *   Password: <string> (hashed),   
 *   Email: <string>,  
 *   Birthday: <string>  
 *   FavoriteMovies: [<string>]  
 * }  
 */
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

/**
 * @description Endpoint to delete a user account<br>
 * Requires authorization JWT.
 * @method DELETEUser
 * @param {string} endpoint - /users/:Username
 * @param {req.headers} object - headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {string} - A string containing the message: "<Username> was deleted"
 */
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


const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});


// app.listen(8080, () => {
//   console.log('Your app is listening on port 8080.');
// });