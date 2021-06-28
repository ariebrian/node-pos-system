module.exports = app => {
    const transaction = require("../controllers/transaction.controllers.js");
  
    var router = require("express").Router();

    // Retrieve all Tutorials
  router.get("/", transaction.findAll);

  router.post("/", transaction.create)

  router.put("/:id", transaction.update)

  router.delete("/:id", transaction.delete)

  app.use('/api/transactions', router);
}