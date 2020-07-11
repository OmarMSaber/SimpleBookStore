var express=require("express");
var addBookHandler=require("./handlers/addBook");
var listBooksHandler=require("./handlers/scanBooks");
var app=express();

// Rounting determine Controller
app.use("/Books/addBook",addBookHandler);
app.use("/Books",listBooksHandler);

app.set("view engine","ejs");
app.set("views","./views");

app.listen(8090);
