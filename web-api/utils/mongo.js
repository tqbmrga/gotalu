var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( "mongodb://localhost:27017/marankings", function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};

// using
// const mongoUtil = require( '../utils/mongo' )
// const db = mongoUtil.getDb()

// db.collection( 'users' ).find()