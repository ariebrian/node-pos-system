module.exports = app => {
    const users = require("../controllers/users.controllers");
  
    var router = require("express").Router();

  router.post("/login", users.login);
 
  app.use('/', router);
}