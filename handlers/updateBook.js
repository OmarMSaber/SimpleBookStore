

/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
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