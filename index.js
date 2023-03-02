// index.js
// where your node app starts

// init project
const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/", (req, res) => {
  // Get current Unix timestamp in milliseconds
  // Return JSON response with current Unix timestamp
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const timestamp = isNaN(date) ? new Date(date) : new Date(parseInt(date));

  if (isNaN(timestamp.getTime())) {
    // If date is not valid, return error response
    return res.status(400).json({ error: "Invalid date" });
  }

  res.json({
    unix: timestamp.getTime(),
    utc: timestamp.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
