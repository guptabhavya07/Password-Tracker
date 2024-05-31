import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
import bodyparser from 'body-parser'
import cors from 'cors'
// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'password-tracker';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

 client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
app.post('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})
app.delete('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})
app.listen(port, () => {
  console.log(`app listening ${port}`)
})
