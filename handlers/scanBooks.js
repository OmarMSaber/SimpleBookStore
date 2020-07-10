

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
var express=require("express");
var fs=require("fs");
var bodyParser=require("body-parser");
var router=express.Router();
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

AWS.config.update({
    region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Books",
    ProjectionExpression: "bookID,num_pages, title, average_rating",
    FilterExpression: "num_pages between :start_yr and :end_yr",
    ExpressionAttributeValues: {
         ":start_yr": 100,
         ":end_yr": 400
    }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(book) {
           console.log(
                book.num_pages + ": ",
                book.title, "- rating:", book.average_rating);
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
    router.get("/",function(req,resp){
        resp.render("Books/list",{Books_data:data});
    })
}
// determine Action
module.exports=router;
