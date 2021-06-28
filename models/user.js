module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return Users;
};