var fs = require('fs');

exports.readFile = function(path) {
    return fs.readFileSync(path, 'utf8');
}