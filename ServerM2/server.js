const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "../proto/message.proto";
const SERVER_URI = "0.0.0.0:3000";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const sendMessage = (call, callback) => {
  const { value } = call.request;
  if (!value) {
    return callback(new Error("You must provide a non-empty message."));
  }

  console.log(value);
  // Save to DB

  // Retrieve from DB

  // Send to Any Channel on Slack

  callback(null, { value });
};

const server = new grpc.Server();
server.addService(protoDescriptor.MessageService.service, { sendMessage });
server.bind(SERVER_URI, grpc.ServerCredentials.createInsecure());

server.start();
console.log("Microservice Server 2 is running!");
