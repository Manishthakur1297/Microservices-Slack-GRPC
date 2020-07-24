const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const axios = require("axios");

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
    .post(
      "https://hooks.slack.com/services/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",
      data
    )
    .then((res) => {
      console.log("Insideeeee");
      callback(null, res.status);
    })
    .catch((err) => {
      console.log("Outsidee ", err);
      callback(null, err);
    });

  console.log("===========");
};

const server = new grpc.Server();
server.addService(protoDescriptor.MessageService.service, { sendMessage });
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure());

//Connect Database
connectDB();

server.start();
console.log("Microservice GRPC Server M2 is running!");
