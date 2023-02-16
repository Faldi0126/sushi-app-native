const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

const Redis = require('ioredis');
const redis = new Redis();

const baseUrlApp = 'http://localhost:4001';

const baseUrlUser = 'http://localhost:4002';

const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

//? Get All the Foods
app.get('/foods', async (req, res, next) => {
  try {
    let cacheFoods = await redis.get('food:getAll');
    if (cacheFoods) {
      cacheFoods = JSON.parse(cacheFoods);
      return res.status(200).json(cacheFoods);
    }

    const { data: foodsData } = await axios.get(baseUrlUser + '/users/items');
    const { data: usersData } = await axios.get(baseUrlApp + '/users');
    const data = foodsData.map(food => {
      const user = usersData.find(user => user._id === food.userMongoId);
      return {
        ...food,
        user,
      };
    });

    await redis.set('food:getAll', JSON.stringify(data));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//? Get single food with user listed
app.get('/foods/:id', async (req, res, next) => {
  try {
    let singleFoodCache = await redis.get(`food:${req.params.id}`);

    if (singleFoodCache) {
      singleFoodCache = JSON.parse(singleFoodCache);
      return res.status(200).json(singleFoodCache);
    }

    const { id } = req.params;
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

    await redis.set(`food:${req.params.id}`, JSON.stringify(data));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//? Create new food
app.post('/foods', async (req, res, next) => {
  try {
    const input = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      userMongoId: req.body.userMongoId,
      categoryId: req.body.categoryId,
      ingredientName: req.body.ingredientName,
    };

    const { data } = await axios.post(baseUrlUser + '/users/items/add', input);

    const keys = await redis.keys('food:*');
    await redis.del(keys);

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//? Delete food
app.delete('/foods/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data } = await axios.delete(baseUrlUser + `/users/items/${id}`);

    const keys = await redis.keys('food:*');
    await redis.del(keys);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

//? Update food
app.put('/foods/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const input = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      userMongoId: req.body.userMongoId,
      categoryId: req.body.categoryId,
      ingredientName: req.body.ingredientName,
    };

    const { data } = await axios.put(baseUrlUser + `/users/items/${id}`, input);

    const keys = await redis.keys('food:*');
    await redis.del(keys);

    res.status(200).json(data);
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Orchestrator listening on port ${port}`);
});
