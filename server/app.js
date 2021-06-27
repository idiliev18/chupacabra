require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const api = require("./routes/api.js");
const rss = require("./routes/rss.js");
const RateLimit = require("express-rate-limit");

let limiter = new RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: process.env.MAX_REQUEST_COUNT,
});

app.use(limiter);

app.use("/api", api);
app.use("/rss", rss);

app.get("/", (req, res) => {
    res.send("Qsha");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
