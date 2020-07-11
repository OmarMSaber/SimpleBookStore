
var AWS = require("aws-sdk");
var express=require("express");
var fs=require("fs");
var bodyParser=require("body-parser");
var router=express.Router();
var middleToParseRequestBody=bodyParser.urlencoded({extended:false});

AWS.config.update({
  region: "us-east-1",
});
var table = "Books";
var bookID,
    title,
    authors,
    average_rating,
    isbn,
    isbn13,
    language_code,
    num_pages,
    ratings_count,
    text_reviews_count,
    publication_date,
    publisher;

var docClient = new AWS.DynamoDB.DocumentClient();
router.get("/",function(req,resp){
      resp.render("Books/Add");
    });


router.post("/",middleToParseRequestBody,function(req,resp){
  // Get Data from request body..
  // Save data into database ..
  // redirect list action
  // Save in databse ..
  var bookID = new Date().getUTCMilliseconds();

  title=req.body.title
  authors=req.body.authors
  average_rating=req.body.average_rating
  isbn=req.body.isbn
  isbn13=req.body.isbn13
  language_code=req.body.language_code
  num_pages=req.body.num_pages
  ratings_count=req.body.ratings_count
  text_reviews_count=req.body.text_reviews_count
  publication_date=req.body.publication_date
  publisher=req.body.publisher

      // resp.redirect("/products");
      var params = {
          TableName:table,
          Item:{
            'bookID' : bookID,
            'title': title,
            'authors': authors,
            'average_rating' :average_rating,
            'isbn': isbn,
            'isbn13':isbn13,
            'language_code' : language_code,
            'text_reviews_count': text_reviews_count,
            'ratings_count': ratings_count,
            'num_pages' : num_pages,
            'publication_date': publication_date,
            'publisher':publisher,
          }
      };


      console.log("Adding a new item...");
      docClient.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("Added item:", JSON.stringify(data, null, 2));
          }
      })
  });

module.exports=router;
