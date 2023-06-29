const express = require("express");
const config = require("config");
//const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use("/api", require("./routes/load.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "dist")));
  app.get("*", (req, res) => {
    res
      .status(200)
      .sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server start ${PORT}`));
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}
start();
