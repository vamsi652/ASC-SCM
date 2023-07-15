const express = require("express");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// const cors = require('cors');
const bcrypt=require("bcrypt")
const app = express();
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'Blockchain';
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const crypto = require('crypto');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
const secretKey = crypto.randomBytes(32).toString('hex');
const MongoSchema = new mongoose.Schema({
  Name: String,
  Role: String,
  ID: [
    { id: Number },
    { parent: Number },
  ],
  Password: String,
  Account: String
});
MongoClient.connect(dbUrl, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db(dbName);

    app.listen(4000, function () {
      console.log('Listening on port 4000');
    });
    app.get("/Login",async(req,res)=>{
      let x=req.query.param1;
      let z=req.query.param2;
      const salt=await bcrypt.genSalt();
      y=await bcrypt.hash(z,salt);
      console.log(req.query,y)
      await db.collection('Reg').find().toArray()
      .then(result=>{
        for(let i=0;i<result.length;i++){
          
          if(result[i].Id==x){
            console.log(result[i],result[i].Id,x)
            bcrypt.compare(req.query.param2, result[i].Password, function(err, result1) {  // Compare
              // if passwords match
              if (result1) {
                // Generate a JWT
        const token = jwt.sign({ userId: result[i]._id }, secretKey, { expiresIn: 60*1});

        // Set the JWT as a cookie
        res.cookie('token', token, { httpOnly: true });
                  res.json(result[i])
              }
              // if passwords do not match
              else {
                    console.log("Invalid password!");
              }
            });
          }
      }
      })
    })
    // Middleware function to verify JWT
function verifyToken(req, res, next) {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
}
app.get('/protected-route', verifyToken, (req, res) => {
  // Access the user ID using req.userId
  // Perform actions for the protected route
  res.json({ message: 'Access granted.' });
});
app.get("/Account", async (req, res) => {
  try {
    // Assuming you have a 'User' model in Mongoose representing your MongoDB collection
    const user = await User.findOne({ _id: req.userId }); // Adjust the query based on your schema and requirements
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const metamaskAddress = user.metamaskAddress; // Assuming 'metamaskAddress' is the field storing the MetaMask address

    return res.json({ metamaskAddress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
    app.get("/Details",async(req,res)=>{
      let x=req.query.param1+"";
      console.log(x);
      await db.collection('Reg').find({Role:x}).toArray()
      .then(result=>{
        console.log(result[0])
               res.json(result)
        });
      })   
      app.post('/Register', async (req, res) => {
      console.log(req.body);
      const salt=await bcrypt.genSalt();
      req.body.Password=await bcrypt.hash(req.body.Password,salt);
      await db.collection('Reg').insertOne(req.body)
        .then(result => {
          console.log(result);
          res.json(result);
        })
        .catch(err => {console.log(err);
          res.json(err);
    });
    });
     app.post("/TransactionHistory",async(req,res)=>{
      await db.collection('transactions').insertOne(req.body)
      .then(result => {
        console.log(result);
        res.json(result);
      })
      .catch(err => {console.log(err);
        res.json(err);
      });
    })
    app.get("/TransactionsHistory",async(req,res)=>{
      x=req.query.param1;
      await db.collection('transactions').find({userId:x}).toArray()
      .then(result=>{
          res.json(result)
        });
    })
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });
  
  // $2b$10$fr3K5hP78zTD2IE3V71peOyXxmvksXOPv5IrPAw8x5yGtXRFwdAXa
  // $2b$10$NH/KeO3vKqPwlOOnk6GJCO5VoFspRzn8yV9jVMAmJsfU8DT8N3ymy