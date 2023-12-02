import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.isConnected = false;
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const server = `mongodb://${host}:${port}`;
    this._client = new MongoClient(server, {
      useNewUrlParser: true, useUnifiedTopology: true,
    });
    this._client.connect().then(() => {
      this.isConnected = true;
      this.db = this._client.db(database);
    }).catch(() => {
      this.isConnected = false;
    });
  }
  /**
   * Check if client is connected to the db
   * @returns {Promise<Number>}
   */

  isAlive() {
    return this.isConnected;
  }

  /**
   * Return the number of documents in the users collection
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    const count = await this.db.collection('users').countDocuments();
    return count;
  }

  /**
   * Returns the number of documents in the files collection
   * @returns {integer}
   */
  async nbFiles() {
    const count = await this.db.collection('files').countDocuments();
    return count;
  }
}

export default new DBClient();
