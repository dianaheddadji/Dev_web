var img1 = new Image();
var img2 = new Image();


img1.src = 'css/images/trine.jpg';
img2.src = 'css/images/trine2.jpg';

var W = window.innerWidth,
    H = window.innerHeight;


function createCanvas(){
    var metaJquery = document.createElement('meta');
    document.body.appendChild(metaJquery);
    metaJquery.setAttribute('type', "text/javascript");
    metaJquery.setAttribute('src', "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");

    var myCanvas = document.createElement('canvas');
    myCanvas.setAttribute('id', 'canvas');
    var myDiv = document.createElement('div');
    document.body.appendChild(myDiv);
    myDiv.setAttribute('id', 'remplir');
    myDiv.appendChild(myCanvas);


    myCanvas.width = W;
    myCanvas.height = H;
    var ctx = myCanvas.getContext('2d');
    img2.style.width = W;
    img2.style.height = H;
    ctx.drawImage(img1, 0, 0, W, H);

				
    var xPos = 0; 
    var yPos = 0;
    
    myCanvas.addEventListener('click', function transition(e){


        ctx.clearRect(xPos, yPos, 100, 100);


				ctx.clearRect( xPos, yPos, 100, 100);
        ctx.drawImage(img2, xPos, yPos, 100, 100, xPos, yPos, 100, 100);

        xPos += 100;
        if(xPos > W){
            yPos += 100;
            xPos = 0;  
        }
        if(yPos > H){
            return;
        }
    
        requestAnimationFrame(transition);
    }, true);
}

window.addEventListener('load', createCanvas);
