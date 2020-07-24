const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const axios = require("axios");
const config = require("config");

const SLACK_URL = config.get("SLACK_URL");

const connectDB = require("./config/db");
const Message = require("./models/message");

const PROTO_PATH = __dirname + "/message.proto";
const SERVER_URI = "0.0.0.0:31000";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const sendMessage = (call, callback) => {
  const { msg } = call.request;
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

  console.log(data);

  axios
    .post(SLACK_URL, data)
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
console.log("Microservice GRPC Server M2 is running!");
