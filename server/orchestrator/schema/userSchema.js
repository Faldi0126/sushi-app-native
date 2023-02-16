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
type User {
  _id: ID
  username: String
  email: String
  role: String
  phoneNumber: String
  address: String,
}

input newUser {
  username: String
  email: String
  password: String
  role: String
  phoneNumber: String
  address: String
}

## For delete user
type deleteUser {
  message: String
}

## For add user
type postUser {
  message: String
}

type Mutation {
  addUser(newUser: newUser): postUser
  deleteUser(id: ID): deleteUser
}


type Query {
  getUsers: [User]
  getOneUser(id: ID): User
}


`;

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        let usersCache = await redis.get('users');
        if (usersCache) {
          usersCache = JSON.parse(usersCache);
          return usersCache;
        }

        const { data } = await axios.get(baseUrlApp + '/users');

        await redis.set('users', JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    getOneUser: async (_, args) => {
      try {
        const { id } = args;

        let oneUser = await redis.get(`user:${id}`);

        if (oneUser) {
          oneUser = JSON.parse(oneUser);
          return oneUser;
        }

        const { data } = await axios.get(baseUrlApp + `/users/${id}`);

        await redis.set(`user:${id}`, JSON.stringify(data));

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { newUser } = args;
        const { data } = await axios.post(
          baseUrlApp + '/users/addUser',
          newUser
        );

        await redis.del('users');

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(baseUrlApp + `/users/${id}`);

        await redis.del('users');

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
