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
    LoginContainer1.innerHTML ="<form action='/register' method='post'>"+
      "<div><h2>用户注册</h2></div>"
      +"<div><p></p></div>"
      +"<div>"+
      "<div><label for=''>用户名：</label><input type='text' name='username'/></div>"
      +"<div><label for=''>密码：</label><input type='password' name='password'/></div>"
      +"<div><label for=''>确认密码：</label><input type='password' name='identifyingPassword'/></div>"
      +"<div><input type='submit' value='注册'/><input type='reset' value='取消'/></div>"
      +"<a>已有账号？点击登录</a>"
      + "</div>"+"</form>";
    var LoginContainer = document.querySelector(".login > div > div");
    LoginContainer.innerHTML ="<form action='/login' method='post'>"+
      "<div><h2>用户登录</h2></div>"
      +"<div><p></p></div>"
      +"<div>"+
      "<div><label for=''>用户名：</label><input type='text' name='username'/></div>"
      +"<div><label for=''>密码：</label><input type='password' name='password'/></div>"
      +"<div><label for=''>验证码：</label><input type='text' name='identifyingCode'/></div>"
      +"<div><input type='submit' value='登录'/><input type='reset' value='取消'/></div>"
      +"<a>还没有账号？点击注册</a>"
      + "</div>"+"</form>";
      var cancel = document.querySelector(".login > div > div form> div:nth-child(2) p");
    cancel.addEventListener("click",function (e){
      e.stopPropagation();
      Login.style.visibility="hidden";
      Login.style.opacity=0;
    });
    var cancel = document.querySelector(".login > div > div:last-child form> div:nth-child(2) p");
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

    });
    var logining = document.querySelector(".login > div > div:first-child a");
    logining.addEventListener("click",function (e) {
      e.stopPropagation();
      LoginContainer1.style.opacity=1;
      LoginContainer.style.opacity=0;
      LoginContainer1.style.top="25%";
      LoginContainer.style.top="-7%";

    });
  });




