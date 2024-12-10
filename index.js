const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// CORS Proxy Route
app.get("/cors", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(url);
    const data = await response.text();

    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching the URL: " + error.message);
  }
});

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});