const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//CORS
app.use(cors());

//INIT Middleware
app.use(morgan("dev"));
app.use(
  express.json({
    extended: false,
  })
);

app.use("/api/message", require("./routes/message"));

app.get("/", (req, res) => {
  res.send(
    "Implementation of 2 Microservices using Rest and grpc for internal communication"
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Client Microservice 1 started on port ${PORT}`)
);
