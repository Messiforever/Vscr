/**
 * Created by Messi on 2016/12/27.
 */
var express = require('express');
var ejs = require('ejs');  //安装ejs引擎
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/',express.static(__dirname)); //注册动态路由，定位到根目录
app.engine('.html',ejs.__express);//指定一个html文件用ejs方式解析HTML文件
app.set('view engine','html');


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

              if(result.username == "hello" && result.password == "a123" && result.identifyingCode=="a123") {
                 var expireDate = new Date();
                 var expireDays = 10;
                expireDate.setTime(expireDate.getTime() + expireDays*24*3600*1000);
                res.writeHead(200,{
                  'Set-Cookie':'auth=qwer-tyui-asdf-ghjk;nickname=Messi;username=' + result.username + ';expire=' + expireDate.toGMTString(),
                  'Content-type':'text/plain:charset=utf-8'
                });
                res.end(JSON.stringify({flag:true,meg:"登陆成功"}));

                  }
                  else {
                res.json({flag:false,meg:"用户名或密码错误"});
              }
    }

    Logins(loginData);
  });
});
router.post("/register",function (req, res) {
  var result = req.body;

      if(result.username == "hello" && result.password == "a123" && result.identifyingPassword=="a123") {
        var expireDate = new Date();
        var expireDays = -1;
        expireDate.setTime(expireDate.getTime() + expireDays*24*3600*1000);

        res.writeHead(200,{
          'Set-Cookie':'auth=qwer-tyui-asdf-ghjk;nickname=Messi;username=' + result.username + ';expire=' + expireDate.toGMTString(),
          'Content-type':'text/plain:charset=utf-8'
        });
        res.end(JSON.stringify({flag:true,meg:"注册成功"}));

      }
      else {
        res.json({flag:false,meg:"用户名已存在，注册失败"});
      }



  });


router.get("/chat", function (req, res) {
  exports.chat = exports.chat || {};
  function Message(key,m,uname,time,to) {
    var self = this;
    self.key = key;
    self["user-name"] = uname;
    self["message-time"] = time;
    self.message = m;
    self.to = to;
    self.isToAll = false;
    self.type = 1;//0透传消息，非0为显示消息

  }
  var logined;
  if (req.query.username) {
    logined = req.query.username;
    exports.chat[logined] = exports.chat[logined] || {};
    exports.chat[logined].res = res;
    exports.chat[logined].req = req;
    exports.chat[logined].req.on("close",function () {
      for(var u in exports.chat){
        if(exports.chat.hasOwnProperty(u)) { //hasOwnProperty不查找原型，只查找自己的属性
          var m = new Message("user-offline","",logined,new Date(),"");
          m.isToAll = true;
          m.type = 0;

          exports.chat[u].res.write("data:" + JSON.stringify(m) + "\n\n");
        }

      }
      delete exports.chat[logined];
    });

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Contral": "no-cache",
      "Connection": "keep-alive"
    });
    for (var u in exports.chat) {
      if (exports.chat.hasOwnProperty(u)) {
        var m = new Message(
          "user-online",
          "",
          logined,
          new Date(),
          ""

        );
        m.isToAll = true;
        m.type = 0;

        exports.chat[u].res.write("data:" + JSON.stringify(m) + "\n\n");
      }

    }
  }
  //获取所有在线用户
  if (req.query.GetALLUser) {
    var users = [];

    for (var u1 in exports.chat) {
      if (exports.chat.hasOwnProperty(u1)) {
        users.push(u1);

      }
    }
    res.json(users);
  }
  // if (req.query.Chatting){
  //
  //   var a = req.query.to;
  //   var b = req.query.sendMsg;
  //   exports.chat[a].res.write("data:"+JSON.stringify({content:b})+"\n\n");
  //
  //   res.json({});
  // }
});


app.use('/',router);

var port = 8888; //引入一个端口
app.listen(port);
console.log("Is running on" + port);
