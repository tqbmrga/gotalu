'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../lib/db')

module.exports = {
    get: (req, res) => {
        //let sql = 'SELECT * FROM products'
        // db.query(sql, (err, response) => {
        //     if (err) throw err        
            res.json({
                "results": [
                  {
                    "gender": "female",
                    "name": {
                      "title": "ms",
                      "first": "mechthild",
                      "last": "hansel"
                    },
                    "location": {
                      "street": "poststraße 50",
                      "city": "linz am rhein",
                      "state": "berlin",
                      "postcode": 47815,
                      "coordinates": {
                        "latitude": "-37.4972",
                        "longitude": "78.5837"
                      },
                      "timezone": {
                        "offset": "-5:00",
                        "description": "Eastern Time (US & Canada), Bogota, Lima"
                      }
                    },
                    "email": "mechthild.hansel@example.com",
                    "login": {
                      "uuid": "b4f45c82-6621-4d12-96d6-237827d13b0f",
                      "username": "happydog289",
                      "password": "storms",
                      "salt": "zlf3fkhA",
                      "md5": "a7a7b5f5754fa19aa2798b592a201a66",
                      "sha1": "c5a67f38e8405a59fa63dc19afda2347b25978fe",
                      "sha256": "e30a1a4d687be8930ca8edcc77d800892d0e5a3e39f064cfd4f27f7b1511cdb6"
                    },
                    "dob": {
                      "date": "1969-07-12T14:30:53Z",
                      "age": 49
                    },
                    "registered": {
                      "date": "2010-11-01T16:25:02Z",
                      "age": 8
                    },
                    "phone": "0480-2609013",
                    "cell": "0173-7391989",
                    "id": {
                      "name": "",
                      "value": null
                    },
                    "picture": {
                      "large": "https://randomuser.me/api/portraits/women/17.jpg",
                      "medium": "https://randomuser.me/api/portraits/med/women/17.jpg",
                      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/17.jpg"
                    },
                    "nat": "DE"
                  }
                ],
                "info": {
                  "seed": "36dcfc181cdbe79d",
                  "results": 1,
                  "page": 1,
                  "version": "1.2"
                }
              })
        //})
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