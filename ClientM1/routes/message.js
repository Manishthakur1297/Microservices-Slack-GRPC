const express = require("express");
const router = express.Router();

const { sendMsg } = require("../controllers/message");

// @route       POST api/message
// @desc        Input Message to Microservice 1
// @access      Public
router.post("/", sendMsg);

module.exports = router;
