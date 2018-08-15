//express
const express = require("express");
const app = express();
//中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/x-www-form-urlencoded

//mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost/todolist",
  { useMongoClient: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connect db.");
});

//模型
const todosSchema = new mongoose.Schema({
  key: Number,
  todo: String
});

const todos = mongoose.model("todos", todosSchema);

// const todos = mongoose.model('todos', {
//     key: Number,
//     todo: String
// });

//发送json: 数据+数量
let sendjson = {
  data: [],
  count: 0
};

//设置响应头部跨域访问
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// find create remove count

//api/todos
app.post("/api/todos", function(req, res) {
  const p1 = todos.find({}).exec((err, result) => {
    if (err) console.log(err);
    else {
      sendjson["data"] = result;
    }
  });

  const p2 = todos
    .count((err, result) => {
      if (err) console.log(err);
      else {
        sendjson["count"] = result;
      }
    })
    .exec();

  Promise.all([p1, p2]).then(function(result) {
    console.log(result);
    res.send(JSON.stringify(sendjson));
  });
});

//api/todos/add
app.post("/api/todos/add", function(req, res) {
  todos.create(req.body, function(err) {
    res.send(JSON.stringify({ status: err ? 0 : 1 }));
  });
});

//api/todos/remove
app.post("/api/todos/remove", function(req, res) {
  todos.remove(req.body, function(err) {
    res.send(JSON.stringify({ status: err ? 0 : 1 }));
  });
});

//设置监听80端口
app.listen(8888, function() {
  console.log("listen *:8888");
});
