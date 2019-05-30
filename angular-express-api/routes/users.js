var express = require('express');
var router = express.Router();
var app = express();
let assert = require('assert');

insertUser = function (db, userName, password, email, department, callback) {
  const collection = db.collection('Users');
  collection.insertOne({
    user_name: userName,
    pass_word: password,
    email: email,
    department: department
  }, (err, result) => {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log('User registered')
    callback(result)
  })
}


findUser = function (db, userName, email, callback) {
  const collection = db.collection('Users');

  collection.find({ $or: [{ user_name: userName }, { email: email }] }).toArray((err, docs) => {
    assert.equal(err, null);
    console.log("found the records")
    console.log(docs)
    callback(docs)
  })

}

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
} )




module.exports = router;

// mongodb+srv://jgamino:<password>@cluster0-c2fb4.mongodb.net/test?retryWrites=true
// mongodb+srv://jgamino:<password>@cluster0-c2fb4.mongodb.net/test