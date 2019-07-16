var express = require('express');
var router = express.Router();
var app = express();
var assert = require('assert');
var fs = require('fs');
var jwt = require('jsonwebtoken')
let jwt_express = require('express-jwt')
let rxjs = require('rxjs')
var tools = require('../db_tools')


router.post('/', function (req, res, next) {
    res.json('works')
})

router.get('/:department', function (req, res, next) {
    const public_key = fs.readFileSync('./public.key')
    const headers = req.headers;
    const token = headers.authorization;
    console.log(token)
    const decoded = jwt.verify(token, public_key, {
        algorithms: ['RS256']
    })
    if (decoded) {
        
        const department = decoded.department;
        const db = req.app.locals.db;
        
       return tools.findStationsArray(db, department, function (doc) {
        console.log(doc[0])
            res.status(200).json( doc[0])
        })
        
        
    } else {
        rxjs.throwError('token not valid')
       
    }
})

module.exports = router;