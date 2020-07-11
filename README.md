# SimpleBookStore

Simple BookStore App with nodejs express and AWS DynamoDb 

Frontend

The Frontend is formed using ejs as view engine for the views , Simple views for Adding and Listing Books

Backend

The core of the backend application uses nodejs as the backend server , also using express as the nodejs framework Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications and also easy use of APIs.
The application uses some modules like:
 - aws-sdk to communicate with S3 and DynamoDB
 - ejs as a views engine 
 -express as web framework
 -body-parser for parsing requests

Simple API calls for the main CRUD (Create,Update,Read,Delete) operations are implemented and also APIs for simple queries and scans using the aws-sdk for calls


WorFlow :

-First the Dataset(.csv file for Books) is uploaded to AWS S3 bucket
-DynamoDB table is created and the DatasetToDynamoDB.py script is then run to parse the .csv file and upload the records to DynamoDB
-DatasetToDynamoDB.py script uses boto3 library to communicate with both S3 and DynamoDB
-Run the application by installing dependencies and running "node app.js"
-check https://nodejs.org/en/download/ if node isn't installed
-to run node as a deamon would be needed in deployment use pm2 https://pm2.keymetrics.io/ 
-connect to port 8090 on the deployment machine 

