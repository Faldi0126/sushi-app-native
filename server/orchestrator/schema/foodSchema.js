const axios = require('axios');

const baseUrlApp = 'http://18.136.105.220:4001';

const baseUrlUser = 'http://18.136.105.220:4002';

const Redis = require('ioredis');
const redis = new Redis({
  host: 'redis-17641.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 17641,
  password: '3yFbzCYjMNjl6ItXDldRNY9vOsFEqwFc',
});

const typeDefs = `#graphql
type Food {
  id: ID
  name: String
  description: String
  price: Int
  imgUrl: String
  userMongoId: String
  categoryId: Int,
  Ingredients: [Ingredient]
  Category: Category
  user: User
}

type User {
  _id: ID
  username: String
  email: String
  role: String
  phoneNumber: String
  address: String,
  Category: Category
}

type Category {
  id: ID
  name: String
}

type Ingredient {
  id: ID
  name: String
}

type postFood {
  message: String
}

type deleteFood {
  message: String
}

type editFood {
  message: String
}

input newData {
  name: String
  description: String
  price: Int
  imgUrl: String
  userMongoId: String
  categoryId: Int,
  ingredientName: [String]
}

input editData {
  name: String
  description: String
  price: Int
  imgUrl: String
  categoryId: Int
  userMongoId: String
}

type Mutation {
  addFood(newData: newData): postFood
  deleteFood(id: ID): deleteFood
  editFood( id: ID,editData: editData): editFood

}

type Query {
  getFood: [Food]
  getOneFood(id: ID): Food
}
`;

const resolvers = {
  Query: {
    getFood: async () => {
      try {
        let cacheFoods = await redis.get('food:getAll');
        if (cacheFoods) {
          cacheFoods = JSON.parse(cacheFoods);
          return cacheFoods;
        }

        const { data: foodData } = await axios.get(
          baseUrlUser + '/users/items'
        );
        const { data: userData } = await axios.get(baseUrlApp + '/users');

        const data = foodData.map(food => {
          const user = userData.find(user => user._id === food.userMongoId);
          return {
            ...food,
            user,
          };
        });

        await redis.set('food:getAll', JSON.stringify(data));
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    getOneFood: async (_, args) => {
      try {
        let singleFoodCache = await redis.get(`food:${args.id}`);

        if (singleFoodCache) {
          singleFoodCache = JSON.parse(singleFoodCache);
          return singleFoodCache;
        }

        const { id } = args;
        const { data: foodData } = await axios.get(
          baseUrlUser + `/users/items/${id}`
        );
        const { data: userData } = await axios.get(
          baseUrlApp + `/users/${foodData.userMongoId}`
        );

        const data = {
          ...foodData,
          user: userData,
        };

        await redis.set(`food:${args.id}`, JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addFood: async (_, args) => {
      try {
        const { newData } = args;
        const { data } = await axios.post(
          baseUrlUser + '/users/items/add',
          newData
        );

        const keys = await redis.keys('food:*');
        await redis.del(keys);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteFood: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(baseUrlUser + `/users/items/${id}`);

        const keys = await redis.keys('food:*');
        await redis.del(keys);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editFood: async (_, args) => {
      try {
        const { id } = args;
        const { editData } = args;
        const { data } = await axios.put(
          baseUrlUser + `/users/items/${id}`,
          editData
        );

        const keys = await redis.keys('food:*');
        await redis.del(keys);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
