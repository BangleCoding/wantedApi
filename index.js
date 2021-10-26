

let express = require('express');
let app = express();

app.get('/', function(req, res){
  res.send('Hello World!');
});

let port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:' +port);
});
