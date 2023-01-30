//const express = require('express');
//const request = require('request');
//
//const app = express();
//let url = "https://wol.jw.org/pl/wol/meetings/r12/lp-p/2023/4";
//
//let options = {json: true};
//
//app.use((req, res, next) => {
//  res.header('Access-Control-Allow-Origin', '*');
//  next();
//});
//
//app.get('/getData', (req, res) => {
//  request(url, options, (error, res1, body1) => {
//      if (error) {
//          return  console.log(error)
//      };
//
//      if (!error && res.statusCode == 200) {
//          res.json(body1);
//      };
//  });
//});
//
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`listening on ${PORT}`));




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
