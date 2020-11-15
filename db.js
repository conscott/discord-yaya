const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'QueslarData';


// Get a mongodb client
async function getDb() {
  return new Promise( (resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
      assert.equal(null, err);
      return resolve(client);
    });
  });
}

// Get db connection
// Open database
// Call function with db object
// Close connection
async function withDb(func) {
  const client = await getDb();
  const db = client.db(dbName);
  await func(db);
  client.close();
}

// Save any entry by key, if the same key exists
// just update all the fields in data
async function saveData(key, data) {
  await withDb( async (db) => {
    data._id = key;
    await db.collection('data').updateOne(
      { _id : data._id },
      { $set: data },
      { upsert: true }
    );
  });
}

// Get data field by key
async function getData(key) {
  return new Promise( (resolve, reject) => {
    withDb( async (db) => {
      let result = await db.collection('data').findOne({ _id: key });
      if (result) {
        return resolve(result);
      }
      return reject(`nothing found for key: ${key}`);
    });
  });
}

module.exports = {
  saveData,
  getData,
};
