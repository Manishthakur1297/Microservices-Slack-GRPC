const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const axios = require("axios");

const connectDB = require("./config/db");
const Message = require("./models/message");

const PROTO_PATH = "../proto/message.proto";
const SERVER_URI = "0.0.0.0:31000";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const sendMessage = (call, callback) => {
  const { msg } = call.request;
  console.log(msg, call.request);
  if (!msg) {
    return callback(new Error("You must provide a non-empty message."));
  }

  // Save to DB
  var myData = new Message({
    message: msg,
  });

  myData
    .save()
    .then((item) => {
      console.log("Message saved to database");
    })
    .catch((err) => {
      return res.status(400).send("unable to save to database");
    });

  // Send to Any Channel on Slack

  const data = {
    text: msg,
  };

  axios
    .post(
      "https://hooks.slack.com/services/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",
      data
    )
    .then((res) => {
      callback(null, res.status);
    })
    .catch((err) => {
      callback(null, err);
    });
};

const server = new grpc.Server();
server.addService(protoDescriptor.MessageService.service, { sendMessage });
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure());

//Connect Database
connectDB();

server.start();
console.log("Microservice Server 2 is running!");
