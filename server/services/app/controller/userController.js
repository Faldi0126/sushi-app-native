const { User, Item, Category, Ingredient, sequelize } = require('../models');

class UserController {
  //? get all the items
  static async getItems(req, res, next) {
    try {
      let data = await Item.findAll({
        include: [Category, Ingredient],
        order: [['id', 'ASC']],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  //? get one item
  static async getItemById(req, res, next) {
    try {
      let data = await Item.findByPk(req.params.id, {
        include: [Category, Ingredient],
      });

      if (!data) throw { name: 'Item not found' };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  //? create foods
  static async addFoods(req, res, next) {
    try {
      let { ingredientName } = req.body;
      let input = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        userMongoId: req.body.userMongoId,
      };

      let newItem = await Item.create(input);

      ingredientName = ingredientName.map(el => {
        return {
          name: el,
          itemId: newItem.id,
        };
      });

      let newIngredient = await Ingredient.bulkCreate(ingredientName);
      res.status(200).json({ message: 'Success creating new food' });
    } catch (error) {
      next(error);
    }
  }

  //? Delete item
  static async deleteItem(req, res, next) {
    try {
      let data = await Item.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!data) throw { name: 'Item not found' };

      res.status(200).json({ message: 'Success delete an item' });
    } catch (error) {
      next(error);
    }
  }

  //? Update Items
  static async updateItem(req, res, next) {
    try {
      let id = req.params.id;
      let input = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        userMongoId: req.body.userMongoId,
      };

      let data = await Item.findByPk(id);

      let dataInput = await Item.update(input, {
        where: { id },
      });

      if (!data) throw { name: 'Item not found' };

      res.status(200).json({ message: 'Success update an item' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
