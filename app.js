/**
 * Created by Messi on 2016/12/27.
 */
var express = require('express');
var ejs = require('ejs');  //安装ejs引擎
var app = express();
app.use('/',express.static(__dirname)); //注册动态路由，定位到根目录
var router = express.Router();
router.get("/home",function (req,res) { //当用户在浏览器地址上输入home后，执行这个函数
   var result = [];
   function MainMenu() {
     this.title = "";
     this.icon = "";
     this.bgColor = "";
   }
   var student = new MainMenu();
  student.title = "学员日常";
  student.enName = "student";
  result.push(student);

  result.push({
    title:"打卡记录",
    enName:"record"
  });
  result.push({
    title:"请假申请",
    enName:"apply"
  });
  result.push({
    title:"登录",
    enName:"login"
  });
  result.push({
    title:"课堂表现",
    enName:"performance"
  });
  result.push({
    title:"学员群",
    enName:"group"
  });
  result.push({
    title:"作业",
    enName:"homework"
  });
  result.push({
    title:"源代码",
    enName:"source-code"
  });
  result.push({
    title:"课程管理",
    enName:"course-manage"
  });
  result.push({
    title:"老师备课",
    enName:"prepare-lessons"
  });
  result.push({
    title:"移动端",
    enName:"mobile-download"
  });
  result.push({
    title:"站内消息",
    enName:"message"
  });
  result.push({
    title:"设置",
    enName:"settings"
  });
  result.push({
    title:"注册",
    enName:"register"
  });
  result.push({
    title:"分组",
    enName:"team"
  });
  result.push({
    title:"集体活动",
    enName:"activity"
  });
  // res.json(result);
      if(req.query.ajax) {
        res.json(result);
          }
            else {
        res.render("index.html",{result:result});  //使用某个模板，渲染html模板
      }

});
app.use('/',router);
app.engine('.html',ejs.__express);//指定一个html文件用ejs方式解析HTML文件
app.set('view engine','html');
var port = 8888; //引入一个端口
app.listen(port);
console.log("Is running on" + port);


router.post("/login",function (req,res) {
  req.on('data',function(data) {
    var loginData = decodeURIComponent(data);

    function Logins(param) {
      var result = {};
      var array = param.split("&");
      array.forEach(function (str) {
        var array2 = str.split("=");
        result[array2[0]] = array2[1];
      });
      res.json(result);
    }

    Logins(loginData);
  });
});
router.post("/register",function (req, res) {
  req.on('data',function(data) {
    var registerData = decodeURIComponent(data);

    function Register(param) {
      var result = {};
      var array = param.split("&");
      array.forEach(function (str) {
        var array2 = str.split("=");
        result[array2[0]] = array2[1];
      });
      res.json(result);
    }

    Register(registerData);
  });
});