const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = __dirname + "/../message.proto";
const SERVER_URI = "0.0.0.0:31000";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const client = new protoDescriptor.MessageService(
  SERVER_URI,
  grpc.credentials.createInsecure()
);

exports.sendMsg = (req, res) => {
  try {
    let message = req.body;
    client.sendMessage(message, (err, response) => {
      if (err) {
        return res.status(404).send(err);
      } else {
        return res.redirect("back");
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error!!");
  }
};
