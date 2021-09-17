## My Flix
 a movie API

## Details

This project involved creating a set of data for movies, movie title, description of the movie, image of the movie, genre and directors.  In order to access the information further code was added to create a new user, update user details and to login.  The users then have the ability to add and remove favourite movies to their profile.  

Additional issues around security were addressed using validation and authentication.  These were addressed by ensuring valid information is input into the related registration fields, authorisation tokens are added to login details and passwords are hashed and unretrievable to other users (including admin).

Initially the data in the app was accessed through a local host server but this was changed to a sandbox cluster created using Atlas.  This enabled the app to be deployed using https and for the data to be imported to the server. 

Additional collections for directors, users and genre's were created.  This allowed for favorite movies to be referenced to users and genres/directors to be referenced to each movie.

## Built With

Javascript - server architecture, middleware, endpoint functions and 
MongoDB - data collections created and relevant data entered
Express - middleware for body parsing, validation, unique ID creationg, passport authentication, encryption (bcrypt), morgan (logger tool) and CORS (to limit origin access).
Postman - an app used to test endpoints and to test functionality for the various HTTP methods.
MongoDB Atlas - data exported from MongoDB and imported to cluster
Heroku - app code and link to data deployed to server

## Link

https://my-movies-souperapp.herokuapp.com/


## Getting Started

The link takes the user to a home page which is to be developed further in the next achievement by using REACT NATIVE. 
As the project is primarily the architecture for the API please see the documentation file for further details about endpoints and http responses.

https://my-movies-souperapp.herokuapp.com/documentation.html


### Prerequisites

### Setup

### Install
runs on all browsers


### Usage

### Run tests
Postman is currently used to test the endpoints as there are no frontend functionality or interactivity (at present). However there are no known issues with the endpoints, which all access the app via the http links.
An functionality issue is noted with the update user details where the code does not check for existing usernames (i.e. it's presently possible for two identical users to exist by updating an existing user's name to a username which already exists in the users collection).

### Deployment
The app is currently deployed using heroku 

## Authors

Simon Hart 
Career Foundry

👤 **Author1**

- Github: https://github.com/simharuk2021
- Linkedin: https://www.linkedin.com/in/simon-hart-903444134/

## 🤝 Contributing



## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

Career Foundry course material, tutor and mentor.
