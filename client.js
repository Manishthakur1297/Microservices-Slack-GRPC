const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//CORS
app.use(cors());

//INIT Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));

app.use("/api/message", require("./routes/message"));

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Client Microservice 1 started on port ${PORT}`)
);
