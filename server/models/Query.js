const Datastore = require('nedb-promises');
const path = require('path');

const Query = Datastore.create({
    filename: path.join(__dirname, '../data/queries.db'),
    autoload: true
});

module.exports = Query;
