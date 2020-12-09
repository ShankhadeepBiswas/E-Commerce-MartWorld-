const router = require('express').Router();
const obID = require('mongodb').ObjectID
const Decimal128 = require('mongodb').Decimal128
const db = require('../db')
// Get list of products products
router.get('/', (req, res) => {
    const products = []
    //   {
    //     _id: 'fasdlk1j',
    //     name: 'Stylish Backpack',
    //     description:
    //       'A stylish backpack for the modern women or men. It easily fits all your stuff.',
    //     price: 79.99,
    //     image: 'http://localhost:3100/images/product-backpack.jpg'
    //   },
    //   {
    //     _id: 'asdgfs1',
    //     name: 'Lovely Earrings',
    //     description:
    //       "How could a man resist these lovely earrings? Right - he couldn't.",
    //     price: 129.59,
    //     image: 'http://localhost:3100/images/product-earrings.jpg'
    //   },
    //   {
    //     _id: 'askjll13',
    //     name: 'Working MacBook',
    //     description:
    //       'Yes, you got that right - this MacBook has the old, working keyboard. Time to get it!',
    //     price: 1799,
    //     image: 'http://localhost:3100/images/product-macbook.jpg'
    //   },
    //   {
    //     _id: 'sfhjk1lj21',
    //     name: 'Red Purse',
    //     description: 'A red purse. What is special about? It is red!',
    //     price: 159.89,
    //     image: 'http://localhost:3100/images/product-purse.jpg'
    //   },
    //   {
    //     _id: 'lkljlkk11',
    //     name: 'A T-Shirt',
    //     description:
    //       'Never be naked again! This T-Shirt can soon be yours. If you find that buy button.',
    //     price: 39.99,
    //     image: 'http://localhost:3100/images/product-shirt.jpg'
    //   },
    //   {
    //     _id: 'sajlfjal11',
    //     name: 'Cheap Watch',
    //     description: 'It actually is not cheap. But a watch!',
    //     price: 299.99,
    //     image: 'http://localhost:3100/images/product-watch.jpg'
    //   }
    // ]
    db
    .getDb()
    .db()
    .collection('shop')
    .find()
    .sort({price: 1})
    //skip and limit for pagination
    //.skip((page-1)*product)
    .forEach(prod=>{
      prod.price = prod.price.toString()
      products.push(prod)
    })
    .then(result=>{
      res.status(200).json(products);
       
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg: "An error occured", err});
       
    })
  })

// Get single product
router.get('/:id', (req, res, next) => {
  db
    .getDb()
    .db()
    .collection('shop')
    .findOne({_id: obID(req.params.id)})
    .then(prod=>{
      prod.price = prod.price.toString()
      res.status(200).json(prod);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg: "An error occured", err});
    })
});

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.img
  };
  db
    .getDb()
    .db()
    .collection('shop')
    .insertOne(newProduct)
    .then(result=>{
      console.log(result);
      res.status(201).json({ message: 'Product added', productId: result.insertedId });
       
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({ message: 'Product couldnt be Added', err });
       
    })
  })
  

// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };
  db
    .getDb()
    .db()
    .collection('shop')
    .updateOne({_id: obID(req.params.id)},{$set:updatedProduct})
    .then(prod=>{
      console.log(prod);
      res.status(200).json({msg:"Product Updated!!", productId:prod.insertedId});
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg: "An error occured", err});
    })
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
  db
    .getDb()
    .db()
    .collection('shop')
    .deleteOne({_id: obID(req.params.id)})
    .then(prod=>{
      res.status(200).json({msg:"Product Deleted!"});
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg: "An error occured", err});
    })
});

module.exports = router;