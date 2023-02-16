const User = require('../models/User');
const { hashPassword } = require('../helpers/bcrypt');

class ControllerUser {
  static async findAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const data = await User.findOne(id);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async createOne(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      const data = await User.createOne({
        username,
        email,
        password: hashPassword(password),
        role,
        phoneNumber,
        address,
      });
      res.status(201).json({ message: 'Success create a new user!' });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;

      const data = await User.deleteOne(id);

      if (!data) throw { name: 'Item not found' };

      res.status(200).json({ message: 'Success delete an user' });
    } catch (error) {
      next(err);
    }
  }
}

module.exports = ControllerUser;
