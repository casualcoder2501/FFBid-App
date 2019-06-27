let fs = require('fs');

let url = `${fs.readFileSync('./mongo.txt')}`;

module.exports = {
    url
}

