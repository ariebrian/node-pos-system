const db = require("../models");
const Transactions = db.transactions
const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken')
const config = require('../config/db.config');
const e = require("express");

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    var token = req.headers['access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      const options = {
        where: {},
        order: [],
      };
      
      if (req.body.min_amount !== undefined && req.body.max_amount !== undefined) {
        options.where.amount = {[Op.gt]: req.body.min_amount, [Op.lt]: req.body.max_amount};
      } else if (req.body.min_amount !== undefined && req.body.max_amount == undefined){
        options.where.amount = {[Op.gt]: req.body.min_amount};
      } else if (req.body.min_amount == undefined && req.body.max_amount !== undefined){
        options.where.amount = {[Op.lt]: req.body.max_amount};
      }

      if (req.body.type !== undefined)
          options.where.type = req.body.type;
      
      if (req.body.order_by !== undefined){
          sort = []
          sort.push(req.body.order_by)
          if (req.body.order_rule !== undefined){
            sort.push(req.body.order_rule)
          }          
          options.order.push(sort);
      
      }

      if (req.body.limit !== undefined && req.body.offset !== undefined)
          options.limit = req.body.limit;
          options.offset = req.body.offset;

      
      console.log(options['where'])
        
      Transactions.findAndCountAll({
        where: options['where'],
        order: options['order'],
        limit: options['limit'],
        offset: options['offset']
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
    });
};

exports.create = (req, res) => {
  var token = req.headers['access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      const transactions = {
        amount: req.body.amount,
        notes: req.body.notes,
        type: req.body.type,
        date: new Date(),
      };
    
      // Save user in the database
      Transactions.create(transactions)
        .then(data => {
          res.send({
            message: "created",
            data: data
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating data."
          });
        });
    });
};

exports.update = (req, res) => {
  var token = req.headers['access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      const id = req.params.id;

      Transactions.update(req.body, {
        where: {id : id}
      })
      .then(num => {
        if (num == 1) {
          res.send({
              message: "updated successfully.",
              id : id,
              data : req.body
            });
        } else {
          res.send({
            message: "updated unsuccessful."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating with id=" + id
        });
      })
    });
}

exports.delete = (req, res) => {
  var token = req.headers['access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      const id = req.params.id

      Transactions.destroy({
        where: {id : id}
      })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Deleted"
          })
        } else {
          res.send({
            message: "cannot delete"
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "cannot delete user",
          id: id
        })
      })
    });
}