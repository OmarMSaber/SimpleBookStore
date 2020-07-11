
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Books";

var bookID = 155;

// Update the item, unconditionally,

var params = {
    TableName:table,
    Key:{
        "bookID": bookID
    },
    UpdateExpression: "set average_rating = :r, publisher=:p, language_code=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Steven bright",
        ":a":"arabic"
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
