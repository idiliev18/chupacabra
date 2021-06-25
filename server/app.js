require('dotenv').config({ path: '../.env' })
const express = require('express');
const app = express();
const api = require("./routes/api.js");
const rss = require("./routes/rss.js");

app.use("/api", api);
app.use("/rss", rss);

app.get('/', (req, res) => {
    res.send('Qsha');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})