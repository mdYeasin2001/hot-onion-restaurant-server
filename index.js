const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const cartFoodsCollection = client.db("hotOnionRestaurantCustomersCartFoods").collection("cartFoods");
  app.post('/addToCart', (req, res) => {
      console.log(req.body);
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})