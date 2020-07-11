
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for books published at 1995");

var params = {
    TableName : "Books",
    KeyConditionExpression: " bookID = :yyyy",
    ExpressionAttributeValues: {
        ":yyyy": 1500
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.bookID + ": " + item.title);
        });
    }
});
