var express = require('express');
const request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let options = {json: true};

app.post('/data', function(req, res) {
      request(req.body.data, options, (error, response, body) => {
          if (error) {
              return  console.log(' ERROR :: ', error)
          };

          if (!error && response.statusCode == 200) {
              res.json(body);
          };
      });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
