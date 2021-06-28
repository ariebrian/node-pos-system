const Transactions = require("../models/transaction");

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Transactions.findAll({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};


exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a user
  const transactions = {
    amount: req.body.amount,
    notes: req.body.notes,
    type: req.body.type,
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
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.update = (req, res) => {
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
}

exports.delete = (req, res) => {
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
}