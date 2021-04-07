const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.54hym.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const cartFoodsCollection = client.db("hotOnionRestaurantCustomersCartFoods").collection("cartFoods");
  const orderedFoodsCollection = client.db("hotOnionRestaurantCustomersCartFoods").collection("orderedFoods");
  app.post('/addToCart', (req, res) => {
      const cartFoodInfo = req.body;
      cartFoodsCollection.insertOne(cartFoodInfo)
      .then(result => {
        result.insertedCount > 0 && res.send(!!result.insertedCount);
      })
  });

  app.post('/placeOrder', (req, res) => {
      const orderedData = req.body;
      orderedFoodsCollection.insertOne(orderedData)
      .then(result => {
        result.insertedCount > 0 && res.send(!!result.insertedCount);
      })
  });

  app.get('/cartFoods/:email', (req, res) => {
    const email = req.params.email
    cartFoodsCollection.find({email: email})
    .toArray((err, foods) => {
      res.send(foods)
    })
  })

  app.get('/orders/:email', (req, res) => {
    const email = req.params.email
    orderedFoodsCollection.find({email: email})
    .toArray((err, foods) => {
      res.send(foods)
    })
  })

  app.delete('/removeFromCart/:id', (req, res) => {
    const id = req.params.id
    cartFoodsCollection.deleteOne({_id: ObjectId(id)})
    .then(result => {
      result.deletedCount > 0 && res.send(!!result.deletedCount);
    })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)