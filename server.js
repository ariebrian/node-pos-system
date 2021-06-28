var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello")
})

const db = require('./models')
// db.sequelize.sync();

require("./routes/users.routes")(app);
require("./routes/transaction.routes")(app);
   
app.listen(3000, () => {
 console.log("Server running on port 3000");
});