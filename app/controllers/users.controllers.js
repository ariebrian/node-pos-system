var jwt = require('jsonwebtoken')
const config = require('../config/db.config')

const db = require("../models");
const Users = db.users
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  Users.findOne({ where: { name: req.body.username, password:req.body.password } })
      .then(data => {
        if (!data) return res.status(401).send("Invalid username or password")
        var token = jwt.sign({ id: data._id }, config.secret, {
          expiresIn: 3000 // expires in 24 hours
          
        });
        res.send({token: token});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });

};


