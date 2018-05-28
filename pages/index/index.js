//index.js
var test=require("../index/test.js");
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    times:0,
    currentLevel:1,
    score:0,
    bestScore:0,
    combo:0,
    show:"hide",
    gameMessageText:"真的是太厉害了啊",
    colors:["red","blue","green","yellow","purple"],
    nextColorsArray:["","","","","",""],
    rowArray:["0","1","2","3","4","5","6"],
    active:false,
    startRandamTiles:[],
    totalColorTiles:[],
    positionTile0:'',
    randomTilesNumber:5,
    gameOver: "gameMessageHide",
    test:"hide",
    occupiedPosition:[],
    // activeTile:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log("here");

    // 更新后续方块颜色，代码待封装
    var nextTiles = this.data.currentLevel + 2;
    var colors = this.data.colors;
    var arr=["","","","","",""];
    for (var i = 0; i < nextTiles; i++) {
      arr[i]=colors[Math.floor(Math.random()*colors.length)];
    }
    this.setData({
      nextColorsArray:arr,
    });
    // 更新后续方块颜色，代码待封装


    var randomTiles=[];
    var occupiedPosition=this.data.occupiedPosition;
    for (var i = 0; i < this.data.randomTilesNumber;i++){
      var pos_color={};
      var pos_x=Math.floor(Math.random()*7);
      var pos_y=Math.floor(Math.random()*7);
      // var currentIndex_xy = "" + pos_x + pos_y;
      // if (occupiedPosition.indexOf(currentIndex_xy) != -1) {
      //   i--;
      //   continue;
      // }
      // occupiedPosition.push(currentIndex_xy);
      var color=colors[Math.floor(Math.random()*colors.length)];
      var position_x=12+(100+4)*pos_x;
      var position_y=(100+4)*pos_y;
      var index_xy=""+pos_x+pos_y;
      var className = "class" + index_xy;
      pos_color.index_x=pos_x;
      pos_color.index_y=pos_y;
      pos_color.color=color;
      pos_color.position_x=position_x;
      pos_color.position_y=position_y;
      pos_color.className=className;
      pos_color.tmpClassName = className;
      pos_color.index_xy=index_xy;
      randomTiles.push(pos_color);
    }
    this.setData({
      startRandamTiles:randomTiles,
      totalColorTiles:randomTiles,
      occupiedPosition:occupiedPosition
    })
    console.log(this.data.startRandamTiles);
    var startRandamTiles = this.data.startRandamTiles;
    for (var i = 0; i < startRandamTiles.length;i++){
      var str = "x: " + startRandamTiles[i].x + " y: " + startRandamTiles[i].y + " color: " + startRandamTiles[i].color + " pos_x: " + startRandamTiles[i].position_x + " pos_y: " + startRandamTiles[i].position_y + " className: " + startRandamTiles[i].className;
      console.log(str);
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  help:function(e){
    // console.log(e.detail.x);
    // console.log(e.detail.y);
    // console.log(e.target.offsetLeft);
    // console.log(e.target.offsetTop);
    var _this=this;
    var isShown=_this.data.show==="hide"?"show":"hide";
    this.setData({
      show:isShown
    });
  },
  newGame: function () {

    // 更新后续方块颜色
    var nextTiles = this.data.currentLevel + 2;
    var colors = this.data.colors;
    var arr = ["", "", "", "", "", ""];
    for (var i = 0; i < nextTiles; i++) {
      arr[i] = colors[Math.floor(Math.random() * colors.length)];
    }
    // 更新后续方块颜色
    this.setData({
      nextColorsArray: arr,
      gameOver:"gameMessageHide"
    });
    var randomTiles = [];
    var occupiedPosition=this.data.occupiedPosition;
    for (var i = 0; i < this.data.randomTilesNumber; i++) {
      var pos_color = {};
      var pos_x = Math.floor(Math.random() * 7);
      var pos_y = Math.floor(Math.random() * 7);
      // var currentIndex_xy = "" + pos_x + pos_y;
      // if (occupiedPosition.indexOf(currentIndex_xy) != -1) {
      //   i--;
      //   continue;
      // }
      // occupiedPosition.push(currentIndex_xy);
      var color = colors[Math.floor(Math.random() * colors.length)];
      var position_x = 12 + (100 + 4) * pos_x;
      var position_y = (100 + 4) * pos_y;
      var indexx_xy=""+pos_x+pos_y;
      var className="class"+pos_x+pos_y;
      pos_color.index_x = pos_x;
      pos_color.index_y = pos_y;
      pos_color.color = color;
      pos_color.position_x = position_x;
      pos_color.position_y = position_y;
      pos_color.className=className;
      pos_color.tmpClassName=className;
      pos_color.index_xy=indexx_xy;
      randomTiles.push(pos_color);
    }
    this.setData({
      startRandamTiles: randomTiles,
      totalColorTiles:randomTiles,
      occupiedPosition:occupiedPosition
    })
  },
  // 点击有颜色色块激活（恢复）函数
  greet:function(e){
    // test.testGreet();
    console.log("greet");
    console.log(e.target.offsetLeft);
    console.log(e.target.offsetTop);
    var offsetX=e.target.offsetLeft;
    var offsetY=e.target.offsetTop;
    var x=Math.floor(offsetX/52);
    var y=Math.floor(offsetY/52);
    var className="class"+x+y;
    console.log(className);
    var tiles = this.data.totalColorTiles;
    for(var i=0;i<tiles.length;i++){
      console.log(tiles[i].className);
      if(tiles[i].className==className){
        tiles[i].className="active";
      }else{
        tiles[i].className=tiles[i].tmpClassName;
      }
    }
    this.setData({
      totalColorTiles:tiles
    })
    console.log(x);
    console.log(y);
    for (var i = 0; i < this.data.startRandamTiles.length; i++) {
      console.log(this.data.startRandamTiles[i].className);
    }
  },
  // 点击无颜色色块达到移动目的函数
  move:function(e){
    console.log("this is move not greet");
    // 先获取点击的位置，以便知道点击的是哪一块
    var offsetX = e.target.offsetLeft;
    var offsetY = e.target.offsetTop;
    var x = Math.floor(offsetX / 52);
    var y = Math.floor(offsetY / 52);
    console.log(x);
    console.log(y);
    var hasActiveTile=false;
    var tilesInColor = this.data.totalColorTiles;
    // 检测当前是否有激活色块，如果有则更新其位置及类名等信息,
    for(var i=0;i<tilesInColor.length;i++){
      if(tilesInColor[i].className=="active"){
        tilesInColor[i].index_x=x;
        tilesInColor[i].index_y=y;
        tilesInColor[i].position_x=12+(100+4)*x;
        tilesInColor[i].position_y=(100+4)*y;
        tilesInColor[i].index_xy=""+x+y;
        tilesInColor[i].className = "class" + index_xy;
        tilesInColor[i].tmpClassName = "class" + index_xy;
        hasActiveTile=true;
        break;
      }
    }
    // 当前没有有色色块则退出
    if(!hasActiveTile){
      console.log("无有色色块");
      return;
    }
    // 获取nextTiles的颜色并更新后续方块的颜色
    var currentLevelTiles = this.data.currentLevel+2;
    var nextColors = this.data.nextColorsArray;
    var colors=this.data.colors;
    // 将当前后续颜色加入即将绘制的方块中
    var newTiles = [];
    var newNextColors=[];
    var occupiedPosition=this.data.occupiedPosition;
    for (var i = 0; i < currentLevelTiles; i++) {
      // 随机获取固定数目的方块，信息包括位置，颜色，类名等，代码待封装
      var pos_color_new = {};
      var pos_x = Math.floor(Math.random() * 7);
      var pos_y = Math.floor(Math.random() * 7);
      // var currentIndex_xy = "" + pos_x + pos_y;
      // if (occupiedPosition.indexOf(currentIndex_xy) != -1) {
      //   i--;
      //   continue;
      // }
      // occupiedPosition.push(currentIndex_xy);
      var newNextColor = colors[Math.floor(Math.random() * colors.length)];
      var position_x = 12 + (100 + 4) * pos_x;
      var position_y = (100 + 4) * pos_y;
      var index_xy=""+pos_x+pos_y;
      var className = "class" + index_xy;
      pos_color_new.index_x = pos_x;
      pos_color_new.index_y = pos_y;
      pos_color_new.index_xy=index_xy;
      pos_color_new.color = nextColors[i];
      pos_color_new.position_x = position_x;
      pos_color_new.position_y = position_y;
      pos_color_new.className = className;
      pos_color_new.tmpClassName = className;
      newTiles.push(pos_color_new);
      // 随机获取固定数目的方块，信息包括位置，颜色，类名等，代码待封装
      newNextColors.push(newNextColor);
    }
    for(var i=newNextColors.length;i<6;i++){
      newNextColors.push("");
    }
    console.log(newTiles);
    var newTilesInColor=tilesInColor.concat(newTiles);
    this.setData({
      totalColorTiles: newTilesInColor,
      nextColorsArray:newNextColors,
      occupiedPosition:occupiedPosition
    })
    console.log("this is total color tiles");
    console.log(this.data.totalColorTiles);
    console.log("this is total occupied Position");
    console.log(this.data.occupiedPosition);
  },
  // 游戏结束函数
  gameOver:function(){
    console.log(this.data.gameOver);
    this.setData({
      gameOver:"gameMessageShow"
    })
  },
})
