const Datastore = require('nedb-promises');
const path = require('path');

const Unanswered = Datastore.create({
    filename: path.join(__dirname, '../data/unanswered.db'),
    autoload: true
});

module.exports = Unanswered;
