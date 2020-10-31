function getstyle(el,property){
	if(getComputedStyle){      //处理兼容性问题 以前的浏览器不支持getComputedStyle
	return getComputedStyle(el)[property];
	             //不可以写成getComputedStyle(el).property;
	
      }
	else{
		return el.currentStyle[property];  //返回的是字符串
	}
}


function animate(el,properties){
	clearInterval(el.timerId);
	el.timerId=setInterval(function(){
        for(var property in properties){
        	var current;
        	var target=properties[property];
		if(property=="opacity"){   //opacity是设置透明度的 是小数
		current=Math.round(parseFloat(getstyle(el,"opacity"))*100);
		}else{
		current=parseInt(getstyle(el,property));
		
		}	
		var speed=(target-current)/30;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(property=="opacity"){
			el.style.opacity=(current+speed)/100;
		}else{
		el.style[property]=current+speed+"px";
		}
        }
	
		
		

	},20)
	
}
