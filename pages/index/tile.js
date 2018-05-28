/*构建方块类，具有横纵坐标、颜色以及是否可用等属性
*
*/
function Tile(position,color){
  this.x=position.x;
  this.y=position.y;
  tihis.color=color;
  this.disable=false;

}

///Tile类原型链上定义方法,更新位置
Tile.prototype.updatePosition=function(position){
  this.x=position.x;
  this.y=position.y;

}

/////Tile类原型链上定义方法，更新可用性
Tile.prototype.updateDisable=function(disable){
  this.disable=disable;
}

//////Tile原型链上定义方法，将方块序列化
Tile.prototype.serialize=function(){
  return {
    position:{
      x:this.x,
      y:this.y
    },
    color:this.color
  }
}
module.exports=Tile;