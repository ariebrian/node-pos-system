module.exports = {
    'secret': 'supersecret',
    HOST: "localhost",
    USER: "brian",
    PASSWORD: "123456",
    DB: "pos-credibook",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };