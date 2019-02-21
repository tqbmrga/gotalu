const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://'+process.env.DB_MONGO_HOST;
const jwt = require('jsonwebtoken');
// const uuidv1 = require('uuid/v1');
// uuidv1()

// let middleware = require('./middleware');
// const config = require('config');
module.exports = {
    get: (req, res) => {      
      MongoClient.connect(url, function(err, db) {
        //req.query.username;req.query.passworld;
        if (err) throw err;
        var dbo = db.db("mongochat");
        dbo.collection("users").find({
            "username": req.query.username,
            "password": req.query.passworld
        }, 
        { projection: { _id: 0 } }).toArray(function(err, result) {
          if (err) throw err;        
          //check User exist
          if(result.length>0)
          {            
            let token = jwt.sign({
                data: [{
                    id:result.id,
                    username:result.username,
                    password:result.passworld
                }]
              }, 'secret', { expiresIn: '7d' });

            // install to data base
            let dbo = db.db("mongochat");
            let now = new Date();
            let myobj = { token: token, username:req.query.username, date:now };            
            dbo.collection("authen").insertOne(myobj, function(err, res) {
              if (err) throw err;
                console.log("1 document inserted");
              db.close();
            });

            // return the JWT token for the future API calls            
            res.json({
               // results: uuidv1(),
                success: true,
                message: 'Authentication successful!',
                token: token
            })
          }
          else
          {
            res.json({
                results:result,
                success:true,
                message:"User is not exist"
            })
          }

          //console.log(result);
          //res.json({"results":result})
          //db.close();
        });       
      });
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE products SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Update success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({message: 'Delete success!'})
        })
    }
}