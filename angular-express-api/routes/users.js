var express = require('express');
var router = express.Router();
var app = express();
var rxjs = require('rxjs');
let throwError = rxjs.throwError
var tools = require('../db_tools')



//user login route
//if validatedCredentials() returns a document of the user then a token is issued
//with the found user's user name and department for front-end consumption
router.post('/login', function (req, res, next) {

  const body = req.body;
  const email = body.email;
  const password = body.password;
  const db = req.app.locals.db;

  tools.validateCredentials(db, email, password, async function (doc) {
    if (doc === false || doc === '' || doc == undefined || doc == null) {

      console.log('no record')
      res.json('no record') //responds with 'no record' if the credentials were not valid

    } else {
      console.log('found')

      const jwt = await tools.createToken({ userName: doc.user_name, department: doc.department }) //issuing of the token to front end
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
    tools.findUser(db, userName, email, function (docs) {
      if (docs.length !== 0 && docs !== null) {
        console.log('user exists' + Date.now())
        res.json('exists')

      }
      if (docs.length === 0) {
        tools.insertUser(db, userName, password, email, department, async function (doc) {
          if(doc.acknowledged === true){
            console.log('user added');
            const jwt = await tools.createToken({ userName: doc.user_name, department: doc.department }) //issuing of the token to front end
            console.log(jwt)
            res.status(200).json({
              status: 'success',
              id_token: jwt
            });
          } else {
            throwError('Something went wrong when adding user')
          }
        
        })
      }

    })
  }
})




module.exports = router;

