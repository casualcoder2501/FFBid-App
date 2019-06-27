var express = require('express');
var router = express.Router();
var app = express();
var assert = require('assert');
var fs = require('fs');
var jwt = require('jsonwebtoken')

// Takes database as it's first arguement and inserts a new user as a document into the 'Users' collection.
// this function allows a callback function to manipulate the results.
insertUser = function (db, userName, password, email, department, callback) {
  
  // accesses the mongodb database collection called 'Users
  const collection = db.collection('Users');
  collection.insertOne({

    user_name: userName,
    pass_word: password,
    email: email,
    department: department

  }, (err, result) => {

    assert.equal(err, null) // makes sure there is no error
    assert.equal(1, result.result.n) // makes sure that only 1 document was entered
    console.log('User registered')
    callback(result)

  })
}

// finds a user document in the 'Users' collection who's user name or email
// match the provided user name and email address.
// used to prevent duplicate entries of users into database from user creation
findUser = function (db, userName, email, callback) {

  // change 'Users' to desired collection name to use this function to
  // find users using user name or email address
  const collection = db.collection('Users');

  collection.find({ $or: [{ user_name: userName }, { email: email }] }).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("found the records")
    console.log(docs)
    callback(docs)
  })

}

// validates the front-end user's login information against database records
// if the user exists, the user information is retrieved using the callback function
// when calling this function.
validateCredentials = function (db, email, password, callback) {
  const collection = db.collection('Users');

  collection.find({ $and: [{ email: email }, { pass_word: password }] }, { email: 0, pass_word: 0 }).toArray((err, doc) => {
    assert.equal(err, null);
    assert.equal(1, 1)
    console.log(doc[0])
    callback(doc[0])
  })


}
// returns a promise that contains a JSON web token with a payload containing
// the 'contents' argument
createToken = function (contents) {
  const promise = new Promise((resolve, reject)=>{
    const _privateRsaKey = fs.readFileSync('./private.key'); 
    const payload = contents;
    const signed = jwt.sign(payload, _privateRsaKey, {
      algorithm: 'RS256',
      expiresIn: 6000 // determines how long token is good for in seconds.
    })
    resolve(signed) //resolves promise when signed exists
    reject(console.error(error))
  })
  return promise
}

//user login route
//if validatedCredentials() returns a document of the user then a token is issued
//with the found user's user name and department for front-end consumption
router.post('/login',  function (req, res, next) {

  const body = req.body;
  const email = body.email;
  const password = body.password;
  const db = req.app.locals.db;

  validateCredentials(db, email, password, async function (doc) {
    if (doc === false || doc === '' || doc == undefined || doc == null) {

      console.log('no record')
      res.json('no record') //responds with 'no record' if the credentials were not valid

    } else {
      console.log('found')

      const jwt = await createToken({ userName: doc.user_name, department: doc.department }) //issuing of the token to front end
      console.log(jwt)

      res.status(200).json({
        id_token: jwt // token sent as a property value of id_token in response object.
      })
    }
  })
})

//route that creates user accounts
//first checks if request body is empty then checks if user already exists
//then adds user to users collection if everything is good
router.post('/', function (req, res, next) {
  const body = req.body;
  const userName = body.userName;
  const password = body.password;
  const email = body.email;
  const department = body.department;


  if (body.userName === null || body.password === null || body.email === null || body.department === null || body.userName === '' || body.password === '' || body.email === '' || body.department === 'Departments') {
    res.json('empty')

  } else {


    const db = req.app.locals.db;
    findUser(db, userName, email, function (docs) {
      if (docs.length !== 0 && docs !== null) {
        console.log('user exists' + Date.now())
        res.json('exists')

      }
      if (docs.length === 0) {
        insertUser(db, userName, password, email, department, function () {
          console.log('user added');
          res.json('added');
        })
      }

    })
  }
})




module.exports = router;

