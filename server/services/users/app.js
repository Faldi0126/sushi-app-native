const cors = require('cors');
const express = require('express');

const app = express();
const port = 4001;

const router = require('./routers/index');
const errorHandler = require('./middleware/errorHandler');
const { runConnection } = require('./config/mongoConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

app.use(errorHandler);

runConnection()
  .then(db => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

module.exports = router;
