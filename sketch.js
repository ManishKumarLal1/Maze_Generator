var cols;
var rows;
var w = 20;
var grid = [];
var stack=[];
var current;

function setup() {
  createCanvas(800, 800);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current=grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited=true;
  current.highlight();
 // stack.push(current);
 var next= current.checkNeighbours();
  if(next){
    next.visited=true;
    removeWalls(current,next);
    current=next;
    stack.push(current);
    }else if(stack.length>0){
      current=stack.pop();
      }
  
}
function index(i,j){
  if(i<0||j<0||i>rows-1||j>cols-1){
    return -1;
    }
  return i+j*cols;
  }

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.wall=[true,true,true,true];
  this.visted=false;
  this.checkNeighbours = function() {
    var neighbours= [];
    var top = grid[index(i,j-1)];
    var right= grid[index(i+1,j)];
    var bottom = grid[index(i,j+1)];
    var left= grid[index(i-1,j)];
    if(top&&!top.visited){
      neighbours.push(top);
      }
    if(right&&!right.visited){
      neighbours.push(right);
      }
    if(bottom&&!bottom.visited){
      neighbours.push(bottom);
      }
    if(left&&!left.visited){
      neighbours.push(left);
      }
    
    if(neighbours.length>0){
      var r= floor(random(0,neighbours.length));
      return neighbours[r];
      }
    else{
      return undefined;
      }
  }
  this.highlight=function(){
    var x=this.i*w;
    var y= this.j*w;
    noStroke();
    fill(255,255,255);
    rect(x,y,w,w);
    }
  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
  
    stroke(255);
    if(this.wall[0]){
    line(x, y, x + w, y);
      }
    if(this.wall[1]){
    line(x+w,y,x+w,y+w);
      }
    if(this.wall[2]){
    line(x+w,y+w,x,y+w);
      }
    if(this.wall[3]){
    line(x,y+w,x,y);
      }
    if(this.visited){
      noStroke();
     fill(123,54,63);
     rect(x,y,w,w);
      }
  };
}

function removeWalls(a,b){
  var x= a.i-b.i;
  var y= a.j-b.j;
  if(x===1){
    a.wall[3]=false;
    b.wall[1]=false;
    }
  else if(x===-1){
    a.wall[1]=false;
    b.wall[3]=false;
    }
  if(y===1){
    a.wall[0]=false;
    b.wall[2]=false;
    }
  else if(y===-1){
    a.wall[2]=false;
    b.wall[0]=false;
    }
  }
  
  
  
  
  
  
