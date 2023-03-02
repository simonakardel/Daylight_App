const express = require('express');
const app = express();

app.use(express.static("public")); 
const port = 3000;

app.get('/', async (req, res) => {
      res.sendFile(__dirname + '/public/index.html'); 
});

  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });

  // Export the Express API
module.exports = app;