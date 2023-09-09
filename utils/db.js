import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err, client) => {
      
      if (!err) {
        this.db = client.db(database);
      } else {
        this.db = false;
      }
    });
  }

  isAlive() {
    if (this.db) return true;
    return false;
  }

  async nbUsers() {
    // returns num of docs in collection called users
    return await this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    // num of items in the collection files
    return await this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
