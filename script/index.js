/**
 * Created by Messi on 2016/12/29.
 */
function ajaxFn(url,option,method,callback) {
  var ajax = null;
  if(window.XMLHttpRequest) {
    ajax = new XMLHttpRequest();
  }else     if(window.ActiveXObject) {
    ajax = new  ActiveXObject("Microsoft.XMLHTTP");
  }
  if(ajax) {
    ajax.onreadystatechange = function () {

          var result = {};
          if(ajax.readyState ==4 && ajax.status==200) {  //协议状态码
            result.content = ajax.responseText;
            result.status = ajax.status;
            callback(result);
          }


      }
    }
    ajax.open("get",url,true);//建立连接 四次握手
    ajax.send(option);
  }


  ajaxFn("/home?ajax=true","get",null,function (flag) {

    if (flag.status == 200) {
      var data = JSON.parse(flag.content);
      var MainMenu = document.querySelector(".main-menu");

      function content() {
        var contentHtml = "";
        for (var i = 0; i < data.length; i++) {
          var Result = data[i];
          var h =
            "<div class='" + Result.enName + "'>" +
            "<span class='icon'></span>"
            +
          "<span>" + Result.title + "</span>"
            + "</div>";
          contentHtml += h;
        }

        MainMenu.innerHTML += contentHtml;
      }

      content();
    }
    var containerSide = document.querySelector(".main-menu > div.login");
    var bg = document.createElement("div");
    var login = document.createElement("div");
    var register = document.createElement("div");
    containerSide.appendChild(bg);
    var Login = document.querySelector(".login > div");
    Login.appendChild(register);
    Login.appendChild(login);
    var LoginContainer1 = document.querySelector(".login > div > div:nth-child(2)");
    LoginContainer1.innerHTML =
      "<div><h2>用户注册</h2></div>"
      +"<div><p></p></div>"
      +"<div>"+
      "<div><label for=''>用户名：</label><input type='text' name='username'/></div>"
      +"<div><label for=''>密码：</label><input type='password' name='password'/></div>"
      +"<div><label for=''>确认密码：</label><input type='password' name='identifyingPassword'/></div>"
      +"<div><input type='submit' value='注册'/><input type='reset' value='取消'/></div>"
      +"<a>已有账号？点击登录</a>"
      + "</div>";
    var LoginContainer = document.querySelector(".login > div > div");
    LoginContainer.innerHTML =
      "<div><h2>用户登录</h2></div>"
      +"<div><p></p></div>"
      +"<div>"+
      "<div><label for='userInput'>用户名：</label><input type='text' name='username' id='userInput'/></div>"
      +"<div><label for=''>密码：</label><input type='password' name='password'/></div>"
      +"<div><label for=''>验证码：</label><input type='text' name='identifyingCode'/></div>"
      +"<div><input type='button' id='userLogin' value='登录' onclick='userSend()'/><input type='reset' value='取消'/></div>"
      +"<a>还没有账号？点击注册</a>"
      + "</div>";
      var cancel = document.querySelector(".login > div > div > div:nth-child(2) p");
    cancel.addEventListener("click",function (e){
      e.stopPropagation();
      Login.style.visibility="hidden";
      Login.style.opacity=0;
    });
    var cancel = document.querySelector(".login > div > div:last-child > div:nth-child(2) p");
    cancel.addEventListener("click",function (e){
      e.stopPropagation();
      Login.style.visibility="hidden";
      Login.style.opacity=0;
    });
    containerSide.addEventListener("click",function (e) {
      e.stopPropagation();
      Login.style.visibility="visible";
      Login.style.opacity=1;

    });
    var logining = document.querySelector(".login > div > div:last-child a");
    logining.addEventListener("click",function (e) {
      e.stopPropagation();
      LoginContainer1.style.opacity=0;
      LoginContainer.style.opacity=1;
      LoginContainer1.style.top="57%";
      LoginContainer.style.top="25%";
      LoginContainer.style.zIndex = 2;
      LoginContainer1.style.zIndex = 1;
    });
    var logining = document.querySelector(".login > div > div:first-child a");
    logining.addEventListener("click",function (e) {
      e.stopPropagation();
      LoginContainer1.style.opacity=1;
      LoginContainer.style.opacity=0;
      LoginContainer1.style.top="25%";
      LoginContainer.style.top="-7%";
      LoginContainer.style.zIndex = 1;
      LoginContainer1.style.zIndex = 2;
    });


    // userLogin.addEventListener("click",function (e) {
    //   e.stopPropagation();
    //   Login.style.visibility="hidden";
    //   Login.style.opacity=0;
    // });

    // function Chat(event) {
    //   var nowone = event.currentTarget.innerHTML;
    //   sendUser = nowone;
    //   usersmessage = "<div>"+"用户："+nowone+"</div>";
    //   if(userName == nowone) {
    //   }else {
    //     CreateChat();
    //
    //   }
    //   return sendUser;
    // }
    //拖动聊天容器
    var mouseinnerX;
    var mouseinnerY;
    var flag=false;
    var mouseX;
    var mouseY;
    window.addEventListener("mousedown",function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });
    window.addEventListener("mouseup",function () {
      flag=false;
    });
    userList.addEventListener("mousedown",function () {
      flag=true;
    });
    userList.addEventListener("mousemove",function (e) {
      if(flag){
        mouseinnerX=e.pageX;
        mouseinnerY=e.pageY;
        userList.style.left=userList.offsetLeft+(mouseinnerX-mouseX)+"px";
        userList.style.top=userList.offsetTop+(mouseinnerY-mouseY)+"px";
        mouseX=mouseinnerX;
        mouseY=mouseinnerY;

      }
    });
    Login1= Login;
  });
//添加聊天功能
function ajax(url, method, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4 && xhr.status ==200) {
      callback(xhr.responseText);
    }
  };
  xhr.open(method,url,true);
  xhr.send(data);
}
var Login1;
var userLogin = document.querySelector("#userLogin");
var userInput = document.getElementById("userInput");
var source,userName,sendUser;
function connect(userName) {
  source = new EventSource("/chat?username=" + userName);
  source.addEventListener("message", function (event) {
    var m =JSON.parse(event.data);
    if(m.key === "user-offline") {
      getAllOnlineUser();
    }else     if(m.key === "user-online") {
      getAllOnlineUser();
    }else     if(m.content) {
      document.querySelector("#usersmessage").innerHTML +="<div>"+sendUser+":"+m.content+"<---------"+getNowFormatDate()+"</div>";
    }
//        output.textContent = event.data;

  }, false); //false意思是不要在捕获阶段执行，在冒泡阶段执行

  // source.addEventListener("connecttime", function (event) {
  //   connectTime.textContent = "Connection was last established at:" + event.data;
  // }, false);

  source.addEventListener("open", function (event) {
    // button.value = "Disconnect";
    // function userSends(event) {
    //   // button.value = "Connect";
    //   event.stopPropagation();
    //   Login1.style.visibility="hidden";
    //   Login1.style.opacity=0;
    //   userLogin.onclick = function () {
    //     userName = userInput.value;
    //     connect(userName);
    //   };
    //   source.close();
    //   status.textContent = "Connection closed!";
    // };

    status.textContent = "Connection open";
  }, false);

  // source.addEventListener("error", function (event) {
  //   if (event.target.readyState === EventSource.CLOSED) {
  //     source.close();
  //     status.textContent = "Connection closed!";
  //   }
  //   else if (event.target.readyState === EventSource.CONNECTING) {
  //     status.textContent = "Connection closed. Attempting tp reconnect!";
  //   } else {
  //     status.textContent = "Connection closed. Unknown error!";
  //   }
  // }, false);

}
var userList= document.querySelector("#dataContainer");
var d= document.querySelector("#friends-list");
function getAllOnlineUser() {
  ajax("/chat?GetALLUser=true","get",null,function (users) {
    users = JSON.parse(users);
    if(Array.isArray(users)) {
      var h = "";

      for(var i = 0;i<users.length;i++){
        h +="<div>"+users[i]+"</div>";

      }
      // var d= document.querySelector("#dataContainer");

      d.innerHTML = h;

    }

  });
}
ajax("/chat?GetALLUser=true","get",null,function (users) {
  users = JSON.parse(users);
  if(Array.isArray(users)) {
    var h = "";

    for(var i = 0;i<users.length;i++){
      h +="<div>"+users[i]+"</div>";

    }
    // var d= document.querySelector("#dataContainer");

    d.innerHTML = h;

  }


});
if (!!window.EventSource) {  //“！！”意思是双重否定表肯定，保持它的值为布尔值
  function userSend() {
    userName = userInput.value;
    if (userInput != "") {
      connect(userName);
    } else {
      alert("用户名不能为空！！");
    }

  }

} else {
  userLogin.style.display = "none";
  status.textContent = "Sorry,your browser doesn't support server-sent events";
}
function getUserProfile() {
 var cookies = document.cookie;
}
getUserProfile();



