const mongodb = require("mongodb"); // load mongodb
const uri = "mongodb+srv://abdi:cs20password@cluster0.nhrgx.mongodb.net/companies?retryWrites=true&w=majority"; // put your URI HERE

var fs = require('fs');
var qs = require('querystring');
var http = require('http');
	
http.createServer(function (req, res) 
  {
	mongodb.connect(uri, {useUnifiedTopology: true}, function(err, db) {
        if (err) { console.log("Connection err: " + err); return}

        var database = db.db("companies");
        var companies = database.collection('companies');

        companies.find().toArray(function(err, items) {
            if (err) {
                console.log("Error: " + err);
                return;
            } else {
                for (i = 0; i < items.length; i++){
                    if ((mode == "by_name" && str == items[i].company) ||
                        (mode == "by_ticker" && str == items[i].ticker)){
                            return "Found";
                        }
                        return "Not Found";
                }
            }
        });
    });
}).listen(8080);