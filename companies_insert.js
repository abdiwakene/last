const mongodb = require('mongodb'); // load mongodb
const url = "mongodb+srv://abdi:cs20password@cluster0.nhrgx.mongodb.net/companies?retryWrites=true&w=majority";
const fs = require('fs');


mongodb.MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
    if (err) {
        return console.log("Error: Connecting to MongoDB." + err);
    }

    // connect to our database
    const dbo = db.db("companies");
    const collection = dbo.collection("companies");

    fs.readFile('companies.csv', 'utf8', function (err, data){
        if (err) {
            return console.log("Error: Reading the provided file. " + err);
        }

        //split the data line by line
        var dataArray = data.split(/\r?\n/);

        // comma delimiting
        for (i = 1; i < dataArray.length - 1; i++){
            var newItem = dataArray[i].split(",");
            var newData = {"company": newItem[0], "ticker": newItem[1]};

            // inserting to database

            collection.insertOne(newData, function(err, res){
                if (err){
                    console.log("Error: Inserting document failed. " + err);
                    return;
                }
                console.log("Success! New document has been inserted.");
            });
        }
    });
});