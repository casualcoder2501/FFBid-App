let fs = require('fs');

// reads the mongodb login information from text file

let url = `${fs.readFileSync('./mongo.txt')}`;
module.exports = {
    url
}

