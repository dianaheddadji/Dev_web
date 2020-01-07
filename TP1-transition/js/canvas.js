//Pour mettre les balises directement sans avoir à toucher le fichier html

/*
window.onload = function createBalises(){
	var metaJquery = document.createElement('script');
	metaJquery.setAttribute('type', "text/javascript");
	metaJquery.setAttribute('src', "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	document.head.appendChild(metaJquery);

	var myImg = document.createElement('img');
	myImg.setAttribute('src', "css/images/trine.jpg");
	var myImg2 = document.createElement('img');
	myImg2.setAttribute('src', "css/images/trine2.jpg");
	var myDiv2 = document.createElement('div');
	myDiv2.setAttribute('id', "imageHover");
	var myDiv = document.createElement('div');
	document.body.appendChild(myDiv);
	myDiv.setAttribute('id', "imageCont");
	myDiv.appendChild(myImg);
	myDiv.appendChild(myDiv2);
	myDiv2.appendChild(myImg2);
}*/

var scApparition={
	tab:Array(),
	height:75,
	width:75,
	prepa:function($img) {
		var i=scApparition.tab.lenght;
		
		$img.hide().after('<div class="scApparitionConteneur"></div>');
		scApparition.tab[i]={
			$img:$img,
			prepa:false,
			attente:false,
			$conteneur:$img.parent().children('.scApparitionConteneur')
		};
		if (!$img[0].complete) {
			scApparition.tab[i].$conteneur.html('<img src="'+$img.attr('src')+'" width="1" height="1" />');
			scApparition.tab[i].interval=window.setInterval('scApparition.ifComplete('+i+')',100);
		} else {
			scApparition.finPrepa(i);
		}
		return i;
	},
	ifComplete:function(i) {
		if (scApparition.tab[i].$conteneur.children('img')[0].complete) {
			window.clearInterval(scApparition.tab[i].interval);
			scApparition.finPrepa(i);
		}
	},
	finPrepa:function(i) {
		scApparition.tab[i].$conteneur.html('<img src="'+scApparition.tab[i].$img.attr('src')+'" />');
		scApparition.tab[i].w=scApparition.tab[i].$conteneur.children('img').width();
		scApparition.tab[i].h=scApparition.tab[i].$conteneur.children('img').height();
		scApparition.tab[i].$conteneur.html('');
		var nbC=Math.ceil(scApparition.tab[i].w/scApparition.width);
		scApparition.tab[i].nbC=nbC;		
		var nbL=Math.ceil(scApparition.tab[i].h/scApparition.height);
		scApparition.tab[i].nbL=nbL;
		var html='';
		for(var c=0; c<nbC; c++) {
			for(var l=0; l<nbL; l++) {				
				html+='<div style="width:'+scApparition.width+'px; height:'+scApparition.height+'px; top:'+(l*scApparition.height)+'px; left:'+(c*scApparition.width)+'px" class="scApparitionCube"><img style="top:-'+(l*scApparition.height)+'px; left:-'+(c*scApparition.width)+'px" src="'+scApparition.tab[i].$img.attr('src')+'" /></div>';
			}
		}
		scApparition.tab[i].$conteneur.html(html);
		scApparition.tab[i].$conteneur.hide();
		scApparition.tab[i].prepa=true;
		if (scApparition.tab[i].attente) {
			scApparition.lancer(i);
		}
	},
	on:function(i) {	
		if (scApparition.tab[i].prepa) {			
			scApparition.lancer(i);
		} else {
			scApparition.tab[i].attente=true;
		}
	},
	lancer:function(i) {
		var $scac=scApparition.tab[i].$conteneur.show().children('.scApparitionCube');
		$scac.each(function(u) {
			c=Math.floor(u/scApparition.tab[i].nbL);
			l=u-(c*scApparition.tab[i].nbL);
			$scac.eq(u).delay((c*50)+(l*50)).fadeIn(600);
		});
	}
}
scApparition.souris={
	on:function(i,x,y) {
		scApparition.tab[i].map=Array();
		scApparition.tab[i].$scac=scApparition.tab[i].$conteneur.show().children('.scApparitionCube');
		for(var c=0; c<scApparition.tab[i].nbC; c++) {
			scApparition.tab[i].map[c]=Array();
			for(var l=0; l<scApparition.tab[i].nbL; l++) {
				//console.log( (c*scApparition.width)+'<='+x+'&& '+x+'<'+((c+1)*scApparition.width)+' && '+(l*scApparition.height)+'<='+y+'	&& '+y+'<'+((l+1)*scApparition.height));		
				if (
						 (c*scApparition.width)<=x 
					&& x<((c+1)*scApparition.width)
					&& (l*scApparition.height)<=y 
					&& y<((l+1)*scApparition.height)
				) {
					scApparition.tab[i].map[c][l]=1;
				} else {
					scApparition.tab[i].map[c][l]=0;
				}
			}
		}
		scApparition.souris.afficher(i);
	},
	suivant:function(i) {
		for(var c=0; c<scApparition.tab[i].nbC; c++) {
			for(var l=0; l<scApparition.tab[i].nbL; l++) {
				if (scApparition.tab[i].map[c][l]==2) {
					if (c-1>=0) {
						if (scApparition.tab[i].map[c-1][l]==0) {
							scApparition.tab[i].map[c-1][l]=1;
						}
					}
					if (c+1<scApparition.tab[i].nbC) {
						if (scApparition.tab[i].map[c+1][l]==0) {
							scApparition.tab[i].map[c+1][l]=1;
						}
					}
					if (l-1>=0) {
						if (scApparition.tab[i].map[c][l-1]==0) {
							scApparition.tab[i].map[c][l-1]=1;
						}
					}
					if (l+1<scApparition.tab[i].nbL) {
						if (scApparition.tab[i].map[c][l+1]==0) {
							scApparition.tab[i].map[c][l+1]=1;
						}
					}
				}
			}
		}
		scApparition.souris.afficher(i);
	},
	afficher:function(i) {
		var reste=0;
		for(var c=0; c<scApparition.tab[i].nbC; c++) {
			for(var l=0; l<scApparition.tab[i].nbL; l++) {
				switch(scApparition.tab[i].map[c][l]) {
					case 1:
						scApparition.tab[i].$scac.eq(c*scApparition.tab[i].nbL+l).fadeIn(1200);
						scApparition.tab[i].map[c][l]=2;
					break;
					case 0:
						reste++;
					break;
				}
			}
		}
		if (reste!=0) {
			window.setTimeout('scApparition.souris.suivant('+i+')',50);
		}
	}
};


$(document).ready(function(){
	var offset = undefined;
	var idImg=scApparition.prepa($('#imageHover img'));
	$('#imageHover').bind('click',function(e) {
		if (scApparition.tab[idImg].prepa) {
			console.log(scApparition.tab[idImg].prepa);	
			offset=$('#imageHover').offset();
			$('#imageHover').unbind('click');
			scApparition.souris.on(idImg,e.clientX-offset.left,e.clientY-offset.top);
		}			
	});


	//if(offset == undefined){
		//console.log("jhk");
		/*offset=$('#imageCont').offset();
		$('#imageCont').unbind('click');
		scApparition.souris.on(idImg,e.clientX-offset.left,e.clientY-offset.top);
		var idImg=scApparition.prepa($('#imageCont img'));
		$('#imageCont').bind('click',function(e) {
			if (scApparition.tab[idImg].prepa) {	
				var offset=$('#imageCont').offset();
				$('#imageCont').unbind('click');
				scApparition.souris.on(idImg,e.clientX-offset.left,e.clientY-offset.top);
			}			
		});*/
	//}



});



