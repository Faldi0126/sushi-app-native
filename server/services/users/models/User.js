const { getDB } = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');

class User {
  static async findAll() {
    try {
      const db = getDB();
      let usersCollection = db.collection('users');
      let users = await usersCollection
        .find({}, { projection: { password: 0 } })
        .toArray();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(id) {
    try {
      const db = getDB();
      let usersCollection = db.collection('users');
      let user = await usersCollection.findOne(
        { _id: ObjectId(id) },
        { projection: { password: 0 } }
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async createOne(rawData) {
    try {
      const db = getDB();
      const data = {
        ...rawData,
        createdAt: new Date(),
      };

      let usersCollection = db.collection('users');
      let newUser = await usersCollection.insertOne(data);

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteOne(id) {
    try {
      const db = getDB();
      let usersCollection = db.collection('users');
      let user = await usersCollection.deleteOne({ _id: ObjectId(id) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
