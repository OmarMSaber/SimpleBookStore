
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Books";

var bookID = 155;

var params = {
    TableName:table,
    Key:{
        "bookID": bookID
    },
    // Conditional delete
    // ConditionExpression:" average_rating <= :val",
    // ExpressionAttributeValues: {
    //     ":val": 5.0
    // }
};

console.log("Attempting a conditional delete...");
docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
