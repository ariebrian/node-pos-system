module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
      amount: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      }
    });
  
    return Transaction;
  };