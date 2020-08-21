# SimpleBookStore

Simple BookStore App with nodejs express and AWS DynamoDb 

### Frontend

The Frontend is formed using ejs as view engine for the views , Simple views for Adding and Listing Books

### Backend

The core of the backend application uses nodejs as the backend server , also using express as the nodejs framework Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications and also easy use of APIs.
The application uses some modules like:
 - aws-sdk to communicate with S3 and DynamoDB
 - ejs as a views engine 
 - express as web framework
 - body-parser for parsing requests

Simple API calls for the main CRUD (Create,Update,Read,Delete) operations are implemented and also APIs for simple queries and scans using the aws-sdk for calls

## Architecture Diagram
![alt text](https://user-images.githubusercontent.com/25318440/90884081-53077100-e3af-11ea-9d10-e1c59f06a6d5.png)

### WorFlow :

- First the Dataset(.csv file for Books) is uploaded to AWS S3 bucket
- DynamoDB table is created and the DatasetToDynamoDB.py script is then run to parse the .csv file and upload the records to DynamoDB
- DatasetToDynamoDB.py script uses boto3 library to communicate with both S3 and DynamoDB
- Run the application by installing dependencies and running "node app.js"
- check https://nodejs.org/en/download/ if node isn't installed
- To run node as a deamon would be needed in deployment use pm2 https://pm2.keymetrics.io/ 
- Connect to port 8090 on the deployment machine 


Docker Image is found here https://hub.docker.com/r/omarmsaber/simple-bookstore-app 

To run use : docker run -p 49160:8090 -d omarsaber/simple-bookstore-app:1.0.0
