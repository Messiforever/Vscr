var starter = angular.module('starter', ['ionic'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

window.addEventListener("orientationchange", function () {
  // alert("方向改变了");
});

//region 轮播
var points = document.querySelectorAll(".gallery-targgles > div");
var carousel = document.getElementById('carousel');

var mouseDownX;
var mouseUpX;
var isMouseDown = false;
function downHandle(event){
  event.preventDefault();
  var e = event;
  if (e.targetTouches && e.targetTouches.length === 1) {
    e = e.targetTouches[0];
  }
  mouseDownX = e.pageX;
  isMouseDown = true;
  carousel.style.transition = "none";
  preMouseX = e.pageX;
  clearTimeout(timeoutInterval);
}
carousel.addEventListener("mousedown", downHandle);
carousel.addEventListener("touchstart", downHandle);
function upHandle(event){
  carousel.style.transition = "transform 0.5s";
  if(event.targetTouches){
    timeoutInterval = setTimeout(runCarousel,2000);
  }
  isMouseDown = false;
  var e = event;
  mouseUpX = e.pageX;
  if(e.targetTouches){
    mouseUpX = preMouseX;
  }
  var subMouseX = mouseUpX - mouseDownX;
  var delta = Math.abs(subMouseX);
  if (delta > 30) {
    if (mouseDownX < mouseUpX) {
      //向右拖动
      if (i > 0) {
        i--;
        carousel.style.transform = "translate("+(-i * gallery.offsetWidth)+"px,0)";
        for (var ii = 0; ii < points.length; ii++) {
          points[ii].style.backgroundColor = "white";
        }
        points[i].style.backgroundColor = "red";
      }
    } else {
      //向左拖动
      if (i < points.length - 1) {
        i++;
        carousel.style.transform = "translate("+(-i * gallery.offsetWidth)+"px,0)";
        for (var ii = 0; ii < points.length; ii++) {
          points[ii].style.backgroundColor = "white";
        }
        points[i].style.backgroundColor = "red";
      }
    }
  } else {
    carousel.style.transform = "translate("+(-i * gallery.offsetWidth)+"px,0)";
  }
}
carousel.addEventListener("mouseup", upHandle);

var preMouseX;
function moveHandle(event) {
  var e = event;
  if (event.targetTouches && event.targetTouches.length == 1) {
    e = event.targetTouches[0];
  }
  var mouseX = e.pageX;
  var subX = mouseX - preMouseX;
  if (isMouseDown) {
    var maxWidth = -(points.length - 1) * gallery.offsetWidth;
    var tLateX = 0;
    var tForm = carousel.style.transform;
    if(tForm.indexOf("translate") > -1){
      tLateX = tForm.split('translate')[1];
      tLateX = tLateX.split(",")[0];
      tLateX = tLateX.substring(1);
      tLateX = tLateX.split("px")[0];
      tLateX = Number(tLateX);
    }
    if (tLateX + subX < 0) {
      if (subX < 0) {
        if (tLateX + subX > maxWidth) {
          carousel.style.transform = "translate("+(tLateX + subX)+"px,0)";
        }
      } else {
        carousel.style.transform = "translate("+(tLateX + subX)+"px,0)";
      }
    }
  }
  preMouseX = mouseX;
}
carousel.addEventListener("mousemove", moveHandle);

carousel.style.transform = "translate(0,0)";
var i = 0;
var timeoutInterval;
function runCarousel() {
  var gWidth = gallery.offsetWidth;
  for (var ii = 0; ii < points.length; ii++) {
    points[ii].style.backgroundColor = "white";
  }
  var current = (-i-1) * gWidth;
  carousel.style.transform = "translate("+current+"px,0)";
  i++;
  if (i > 3) {
    carousel.style.transform = "translate(0,0)";
    i = 0;
  }
  points[i].style.backgroundColor = "red";
  timeoutInterval = setTimeout(runCarousel, 5000);
}
timeoutInterval = setTimeout(runCarousel, 5000);
points[i].style.backgroundColor = "red";
var gallery = document.querySelector(".gallery");
gallery.addEventListener("touchmove", moveHandle);
gallery.addEventListener("mouseenter"
  , function () {
    clearTimeout(timeoutInterval);
  });

function endFn() {
  timeoutInterval = setTimeout(runCarousel, 2000);
}
gallery.addEventListener("touchend",upHandle);
gallery.addEventListener("mouseleave",endFn);
//endregion

starter.controller("StarterController", ["$scope", function ($scope) {
  // document.addEventListener("deviceready",onDeviceReady,false);
  // function onDeviceReady(){}

  var imageContainer = document.getElementById('pictureContainer');
  var image = document.getElementById('pictureCapture');

  /**
   * 输出信息
   * @param msg
   */
  function output(msg) {
    var t = imageContainer.innerHTML;
    imageContainer.innerHTML = t + "<br />" + msg;
  }

  //拍照或选择图片
  var photoing = false;
  $scope.photograph = function (isCamera) {
    output("点击拍照");
    if (photoing) {
      output("正在拍照，请稍候！");
    }
    photoing = true;
    function cameraSuccess(imageData) {
      image = document.getElementById('pictureCapture');
      image.src = 'data:image/jpeg;base64,' + imageData;
      output("成功：" + image.src);
      photoing = false;
    }

    function cameraError(message) {
      output("出错：" + message);
      photoing = false;
    }

    var cameraOptions = {
      destinationType: Camera.DestinationType.DATA_URL
      , sourceType: isCamera === 1 ? Camera.PictureSourceType.CAMERA
        : isCamera == 0 ? Camera.PictureSourceType.PHOTOLIBRARY
        : Camera.PictureSourceType.SAVEDPHOTOALBUM
      // ,popoverOptions:
      // new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
      , allowEdit: true
    };
    navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
  };

  //定位
  var geolocation = false;
  $scope.getPosition = function () {
    if (geolocation) {
      output("正在定位，请稍候！");
      return;
    }
    geolocation = true;
    output("点击定位！");
    var onSuccess = function (position) {
      var dojo = {
        lat: position.coords.latitude
        , lng: position.coords.longitude
        , alt: position.coords.altitude
        , acc: position.coords.accuracy
        , altAcc: position.coords.altitudeAccuracy
        , heading: position.coords.heading
        , speed: position.coords.speed
        , timestamp: position.timestamp
      };
      output(JSON.parse(dojo));
      geolocation = false;
    };
    var onError = function (error) {
      output('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
      geolocation = false;
    };
    var option = {maximumAge: 3000, timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
  };

  //扫描二维码
  $scope.scanCode = function () {
    QRScanner.scan(displayContents);
    function displayContents(err, text){
      if(err){
      } else {
        alert(text);
      }
    }
    QRScanner.show();
  };

  //清除图片
  $scope.clearImage = function () {
    imageContainer.innerHTML = "";
  };

  /**
   * 检查网络
   */
  $scope.checkNetwork = function () {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    output('Connection type: ' + states[networkState]);
  };

  //region 媒体捕获
  function captureMediaSuccess(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
      output(path);
    }
  }

  function captureMediaError(error) {
    output("捕获媒体出错：" + error);
  }

  var captureMediaOption = {};
  //捕获audio
  $scope.captureAudioClick = function () {
    navigator.device.capture.captureAudio(captureMediaSuccess, captureMediaError, captureMediaOption);
  };
  //捕获图片
  $scope.capturePicture = function () {
    navigator.device.capture.captureImage(captureMediaSuccess, captureMediaError, captureMediaOption);
  };
  //捕获视频
  $scope.captureVideo = function () {
    navigator.device.capture.captureVideo(captureMediaSuccess, captureMediaError, captureMediaOption);
  };
  //endregion

  /**
   * 震动
   */
  $scope.vibrationClick = function () {
    navigator.vibrate(500);
  };


}]);
