var myCanvas;
var ctx;
var cercle;

class Point{
	constructor(x, y){
		this.x = x;
	    	this.y = y;
	}
}

class Circle {
	constructor(cx, cy, r){
		this.cx = cx;
		this.cy = cy;
		this.r = r;
	}
}

function carre(val){
	return val * val; 
}

function createPoint(){
	var p1 = new Point(Math.floor(Math.random() * Math.floor(myCanvas.width)), Math.floor(Math.random() * Math.floor(myCanvas.height)));
	var p2 = new Point(Math.floor(Math.random() * Math.floor(myCanvas.width)), Math.floor(Math.random() * Math.floor(myCanvas.height)));
    	var p3 = new Point(Math.floor(Math.random() * Math.floor(myCanvas.width)), Math.floor(Math.random() * Math.floor(myCanvas.height)));

	cercle = findCircle(p1, p2, p3);
	drawCircle();

	ctx.rect(p1.x, p1.y, 50, 50);
	ctx.stroke();

	ctx.rect(p2.x, p2.y, 50, 50);
	ctx.stroke();

	ctx.rect(p3.x, p3.y, 50, 50);
	ctx.stroke();
} 

function findCircle(p1, p2, p3){
	var cx = (((carre(p3.x) - carre(p2.x) + carre(p3.y) - carre(p2.y))/(2 * (p3.y - p2.y))) - ((carre(p2.x) - carre(p1.x) + carre(p2.y) - carre(p1.y)) / (2 * (p2.y - p1.y)))) / ((p3.x - p2.x)/(p3.y - p2.y) - (p2.x - p1.x)/(p2.y - p1.y));

	var cy = - (((p2.x - p1.x) / (p2.y - p1.y)) * cx) + ((carre(p2.x) - carre(p1.x) + carre(p2.y) - carre(p1.y)) / (2 * (p2.y - p1.y)));

    	var r = Math.sqrt(carre(p1.x - cx) + carre(p1.y - cy));
    
	return new Circle(cx, cy, r);
}

function drawCircle(){
	ctx.arc(cercle.cx, cercle.cy, cercle.r, 0, 2*Math.PI);
	ctx.stroke();
}  

function main(){
	myCanvas = document.createElement("canvas");
	myCanvas.setAttribute('id', 'myCanvas');
   	ctx = myCanvas.getContext("2d");
    	myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
    	document.body.appendChild(myCanvas);
    	createPoint();   
}
window.addEventListener("load", main);
