var path = require('path')

module.exports = function (app) {
  app.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/survey.html'));
  });

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });



  //A route will match any path that follows its path immediately with a “/”.
  app.use(function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
  });
};