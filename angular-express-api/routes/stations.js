var express = require('express');
var router = express.Router();
var app = express();
var assert = require('assert');
var fs = require('fs');
var jwt = require('jsonwebtoken')

router.post('/', function (req, res, next){
    res.json('works')
})

module.exports = router;