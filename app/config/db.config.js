module.exports = {
    HOST: "localhost",
    USER: "brian",
    PASSWORD: "123456",
    DB: "test",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  