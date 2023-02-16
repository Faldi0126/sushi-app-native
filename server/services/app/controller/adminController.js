const { User, Item, Category, Ingredient, sequelize } = require('../models')
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class AdminController {
  static async login(req, res, next) {
    try {
      if (!req.body.email) {
        throw { name: "Email is required" }
      }

      if (!req.body.password) {
        throw { name: "Password is required" }
      }

      let user = await User.findOne({
        where: { email: req.body.email }
      })

      if (!user) throw { name: "Invalid Email/Password" }

      let isMatch = comparePassword(req.body.password, user.password)

      if (!isMatch) throw { name: "Invalid Email/Password" }

      let payload = {
        id: user.id
      }


      let access_token = createToken(payload)

      res.status(200).json({ access_token, email: user.email, id: user.id })
    } catch (error) {
      next(error)
    }
  }


  //? create items
  static async addItems(req, res, next) {
    const t = await sequelize.transaction()
    try {
      let { ingredientName } = req.body
      let input = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        authorId: req.user.id,
      }


      let newItem = await Item.create(input,
        {
          transaction: t,
          returning: true
        })

      ingredientName = ingredientName.map(el => {
        return {
          name: el,
          itemId: newItem.id
        }
      })

      let newIngredient = await Ingredient.bulkCreate(
        ingredientName,
        {
          transaction: t,
          returning: true
        },
      )

      await t.commit();
      res.status(200).json({ message: "Success creating new data" })
    } catch (error) {
      await t.rollback();
      next(error)
    }
  }

  //? read items
  static async getFoods(req, res, next) {
    try {
      let data = await Item.findAll({
        include: [Category, User],
        order: [
          ['id', 'ASC'],
        ]
      })

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }


  //? Add new Admin
  static async addAdmin(req, res, next) {
    try {
      let input = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(req.body.password),
        role: "admin",
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
      }

      let newUser = await User.create(input)

      res.status(200).json({ message: "Successfully created a new admin" })
    } catch (error) {
      next(error)
    }
  }

  //? Delete item
  static async deleteItems(req, res, next) {
    try {
      let data = await Item.destroy({
        where: {
          id: req.params.id
        }
      })

      if (!data) throw { name: "Item not found" }

      res.status(200).json({ message: "Success delete an item" })
    } catch (error) {
      next(error)
    }
  }

  //? Get all categories
  static async getCategories(req, res, next) {
    try {
      let data = await Category.findAll()

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  //? Update Items
  static async updateItems(req, res, next) {
    try {
      let id = req.params.id
      let input = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        authorId: req.user.id,
      }

      let data = await Item.findByPk(id)

      let dataInput = await Item.update(input, {
        where: { id }
      })

      if (!data) throw { name: "Item not found" }

      res.status(200).json({ message: "Success update an item" })
    } catch (error) {
      next(error)
    }
  }

  //? Add new category
  static async addCategories(req, res, next) {
    try {
      const input = {
        name: req.body.name
      }

      let data = await Category.create(input)

      res.status(200).json({ message: "Success add a new category" })
    } catch (error) {
      next(error)
    }
  }












}



module.exports = AdminController