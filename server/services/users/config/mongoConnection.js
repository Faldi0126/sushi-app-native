const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://Faldi0126:bananaOrange5@cluster0.cxdbm09.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let db;

async function runConnection() {
  try {
    client.connect();
    db = client.db('c2-Foods');
    console.log('Connected to MongoDB');

    return db;
  } catch (error) {
    client.close();
    throw error;
  }
}

function getDB() {
  return db;
}

module.exports = { runConnection, getDB };
