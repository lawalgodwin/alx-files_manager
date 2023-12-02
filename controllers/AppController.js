import clientRedis from '../utils/redis';
import clientDB from '../utils/db';

/**
 * The app controller class
 */
class AppController {
/**
 * returns the status of the db and redis connection
 * @param {Request object} req
 * @param {Response object} res
 * @returns json object
 */
  static getStatus(req, res) {
    return res.status(200).json({ redis: clientRedis.isAlive(), db: clientDB.isAlive() });
  }

  /**
 * Returns the number of users and files in the db
 * @param {*} req
 * @param {*} res
 */
  static async getStats(req, res) {
    try {
      const users = await clientDB.nbUsers();
      const files = await clientDB.nbFiles();
      res.status(200).json({ users, files });
    } catch (error) {
      res.json(error.message);
    }
  }
}

export default AppController;
