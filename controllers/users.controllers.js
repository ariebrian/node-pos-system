var jwt = require('jsonwebtoken')
const config = require('../config/config')

const db = require("../models");
const Users = db.users
const Op = db.Sequelize.Op;

exports.login = (req, res) => {
  console.log(req.body)
  // Users.findOne({ name: req.body.username, password:req.body.password},
  //   function (err, user){
  //     if (err) return res.status(500).send('Error on server');
  //     if (!user) return res.status(401).send('Invalid username or password');

  //     var token = jwt.sign({ id: user._id }, config.secret, {
  //       expiresIn: 300 // expires in 24 hours
        
  //     });
  //     res.status(200).send({ auth: true, token: token });
  //   })
  Users.findOne({name: req.body.username, password:req.body.password}, 
    function (err, user){console.log(user)})

};
