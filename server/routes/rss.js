const express = require("express");
const axios = require("axios");
const app = express();
const cors = require('cors');

app.use(cors());

/**
 * Get to the /maritimeFeed route
 * @param {string} route
 * @function
 * @async
 * @returns
 * 
 */

app.get("/maritimeFeed", (req, res) => {
    res.setHeader("content-type", "text/rss+xml");
    res.setHeader("Access-Control-Allow-Origin", "*");
    axios
        .get("https://www.maritime.bg/feed/")
        .then((response) => res.send(response.data));
});

module.exports = app;
