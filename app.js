// init project
const express = require("express"); // the library we will use to handle requests
const mongodb = require("mongodb"); // load mongodb
const urls = require("url");

const port = process.env.port || 5000; // port to listen on

const app = express(); // instantiate express


const uri = "mongodb+srv://abdi:cs20password@cluster0.nhrgx.mongodb.net/companies?retryWrites=true&w=majority"; // put your URI HERE


mongodb.MongoClient.connect(uri, (err, db) => {
  // connect to our database
  const dbo = db.db("companies");
  const collection = dbo.collection("companies");

  app.get('/test/', function(req, res){
    res.send("Hello from the 'test' URL");
});

  // Responds to GET requests with the route parameter being the form.
  app.get('/company', (req, res) => {
    var qobj = urls.parse(req.url, true).query
    var querys;
    if (qobj.name != '') {
        //name query 
        querys = {'company' : qobj.name};
    } else if (qobj.ticker != '') {
        //ticker query
        querys = {'ticker': qobj.ticker};
    } 
    // search the database (collection) for all users with the `user` field being the `user` route paramter
    collection.find(querys).toArray(async (err, docs) => {
      if (err) {
        // if an error happens
        res.send("Error in GET req.");
      } else {
        // if all works
        var results = "";
        await docs.forEach(function(item){
            results += item.company + " : " + item.ticker + "\n"; // send back all users found with the matching username
        });
        if (docs.length === 0) {
          results = "No Match Found!";
        }
        res.end(results);
      }
    });
  });

  // listen for requests
  var listener = app.listen(port, () => {
    console.log("This app is listening on port ${ PORT }");
    // console.log("This app is listening on port" + listener.address().port);
  });
});