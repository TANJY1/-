### 中南大学官网复刻笔记

### 1实现下拉菜单

**1.1运用display:none与display:block**

首先我们介绍几个display的属性：

- display:none

当设置为none时表示此元素不会被显示 我们会发现此元素会消失，你设置的那些超链接也都全部没有，这样就可以实现二级菜单的下拉了

- display:block

表示此元素将会被显示为**块级元素**：块级元素总是以一个块的元素表现出来，占领一整行，若干同级块元素会从上之下依次排列（使用float属性除外） 可以设置高度，宽度，各个方向的magin以及padding  

 **行内元素**：他不会单独占据一行，而只是占领自身的宽度和高度所在的空间，若干同级行内元素会从左到右（即某个行内元素可以和其他行内元素共处一行），从上到下依次排列。行内元素不可以设置高度，宽度，其高度由字体大小，宽度由字体长度来决定，行内元素不能设置上下的magin和padding，但是我们可以设置左右的padding值来改变行内的元素宽度；

- display:inline

会被显示为内联元素，将块级元素设置为行内元素，不换行的属性

- display:inline-block

设置了inline-block属性的元素既具有block元素可以设置width和height属性的特性，又保持了inline元素不换行的特性。

- display:inherit

继承父亲节点的display属性

##### 1.2CSS

![Image text](https://github.com/TANJY1/CSU-wangzhifuke/blob/master/image-20201030192628816.png)

**注意**：一般的时候设置ul，他会从按照从上到下的顺序排放<li>,我们可以设置float:left属性实现排放在同一行



##### 1.3 JS

我们设置了一个showup(i)函数,其中传入一个参数i，i是作为一个选择作用，确定是那一个列表显示出来；给专题添加**onmouseover**事件，**当鼠标放到上面的时候，我们将下面的display设置为block**，这样就可以显示出来了。同样的设置**onmouseout**事件，**当鼠标移除（鼠标离开下面列表，而不是标题）的时候，我们将display设置为none**，这样就可以简单的实现下拉菜单了，同样的我们可以实现当鼠标滑动到的时候改变背景颜色，高亮显示。   **设置一个函数实现模块的变化是最好的！！！！**

```
function showup(x){
            	var id=x.querySelector("div:first-of-type a")
            	var s=x.querySelector("div:last-of-type .drop_down");
            	id.onmouseover=function(){
            		s.style.display="block";
            		s.onmouseover=function(){
            			s.style.display="block";
            		}
 				}      
            	s.onmouseout=function(){
            		s.style.display="none";
            	}
            }
```

```
//设置高亮显示
    function light(x){
            	x.onmouseover=function(){
            		x.style.backgroundColor="#6495ED";	
            	}
            	x.onmouseout=function(){
            		x.style.backgroundColor="white";
            	
            	}
            }
```

这样接下来，我们给每一个模块都调用这样的函数，这样就给每一个模块都添加了事件。

*<!--但一开始的时候，我想的是直接在里面设置一个循环，不写函数，直接这个代码实现，但是会发现，不管怎么样，当你滑动到前面的标题，都只是最后一个列表下拉菜单有用，这是因为循环到最后，i=最后一个值，你的事件绑定的那个回调函数与i有关，所以只会调用最后一个列表-->*



### 2.实现水平轮播

我们首先实现一个函数animate，这个函数的作用是完成某一个动画

```javascript
function animate(el,properties){   //properties传入的是键值对，el传入的是你要实现动画的那个对象
	clearInterval(el.timerId);  //防止有其他的计时器
	el.timerId=setInterval(function(){
        for(var property in properties){
        	var current;
        	var target=properties[property];
		if(property=="opacity"){   //opacity是设置透明度的是小数
		current=Math.round(parseFloat(getstyle(el,"opacity"))*100);
		}else{
		current=parseInt(getstyle(el,property));
		
		}	
		var speed=(target-current)/30; //设置一种渐变过程
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		if(property=="opacity"){
			el.style.opacity=(current+speed)/100; 
		}else{
		el.style[property]=current+speed+"px";
		}
        }
	},20)  //隔20ms实行依次
	
}

```

![Image text](https://raw.githubusercontent.com/TANJY1/CSU-wangzhifuke/master/image-20201031161755405.png)

```javascript
function slideto(index){
			var list=document.querySelector(".slider .list");
			if(index==len){   //这里对应着到5位置了，要继续往后滑动，就相当于index=len=6,这时候我们需要切换到1位置，这两个是一样的图片，你切换的时候不会看出来
			currentindex=index=2;
			list.style.left=-liwidth+"px";
            			}
			if(index==-1){   //这里对应着到了0位置需要往前滑动
			currentindex=index=len-3;
			list.style.left=-(len-2)*liwidth+"px";
					}
			 var focusindex;
			 var bullets=document.querySelectorAll(".pagination .bullet");
			 if(index==0){
			 	focusindex=bullets.length-1;
				 }
			 else if(index==len-1){
			 	focusindex=0;
				 }else{
					 	focusindex=index-1;
					 }
					 document.querySelector(".focus").className="bullet";   //将其变为灰色
					 bullets[focusindex].className="bullet focus";    //将选中的设置为黄色
					 
					 
					var left=-index*liwidth;
					animate(list,{left:left});
				}
```

完整的代码请参见文件夹中的



### 3.透明度轮播实现

```javascript
//主要函数的实现
function slideto(prev,next){
					
					var lis=document.querySelectorAll(".slider .list .item");
					var bullets=document.querySelectorAll(".slider .pagination .bullet");
					
					bullets[prev].className="bullet";
					bullets[next].className="bullet focus";
					animate(lis[prev],{opacity: 0});
					animate(lis[next],{opacity: 100});
					
				}
```



### 4.左边浮窗的实现

<img src="C:\Users\tan junyu\AppData\Roaming\Typora\typora-user-images\image-20201031164918889.png" alt="image-20201031164918889" style="zoom:150%;" />



```javascript
//当鼠标划上去div变大
function bigger(i){
						rightx[i].onmouseover=function(){
							if(last1.style.display=="block"){
								rightx[i].style.right=60+"px";	
								rightx[i].style.backgroundColor="orange";
							}
							if(last2.style.display=="block"){
								rightx[i].style.right=10+"px";
								rightx[i].style.backgroundColor="orange";
							}
						}
					}
//回到原样					
					function smaller(i){
						rightx[i].onmouseout=function(){
							if(last2.style.display=="none"){
								rightx[i].style.right=-20+"px";
								rightx[i].style.backgroundColor="#0852A2";
							}
							if(last1.style.display=="none"){
								rightx[i].style.right=-15+"px";
									rightx[i].style.backgroundColor="#0852A2";
							}
						}
					}
					
				
```



### 5.其他的小问题

##### position相关问题

position的四种取值

 **static:static**定位就是不定位，出现在哪里就显示在哪里，子元素在父容器中挨个排放。这是默认取值，只有在你想覆盖以前的定义时才需要显示指定
**relative:relative **就是相对元素static定位时的位置进行偏移，如果指定static时top是50象素，那么指定relative并指定top是10象素时，元素实际top就是60象素了。
  **absolute:absolute**绝对定位，直接指定top、left、right、bottom。有意思的是绝对定位也是“相对”的。它的坐标是相对其容器来说的。容器又是什么呢，容器就是离元素最近的一个定位好的“祖先”，定位好的意思就是其Position是absolute或fixed或relative。如果没有这个容器，那就使用浏览器初始的，也就是body或者html元素。标准是说只需要指定left和right，width可以自动根据容器宽度计算出来，可惜ie不支持。
  **fixed:fixed**才是真正的绝对定位，其位置永远相对浏览器位置来计算。而且就算用户滚动页面，元素位置也能相对浏览器保持不变，也就是说永远可以看到，这个做一些彩单的时候可以用。可惜的是ie还不支持

**relative,absolute,fixed需要指定具体位置**
  relative,absolute,fixed如果不指定它的top,left等属性，那么它的position实际上依然是static。使用了relative,absolute,fixed就必须指定具体的位置。
**

##### 居中的相关问题

1. 文本居中问题：注意要设置line-hight,将line-height与div的height高度设置为一样，另外text-align设置为centre，这样可以实现文本的居中显示

2. **div居中**

   1.使用magin:0 auto

   这种对齐方式要求内部元素(.content_text)是块级元素，并且不能脱离文档流（如设置position:absolute）,否则无效。

   2.设置left:50%;top:50% ;magin-top:-height/2;magin-left:-with/2

   

##### js中“==”与“===”的区别

简单来说： == 代表相同， ===代表严格相同, 为啥这么说呢， 

这么理解： 当进行双等号比较时候： 先检查两个操作数数据类型，如果相同， 则进行===比较， 如果不同， 则愿意为你进行一次类型转换， 转换成相同类型后再进行比较， 而===比较时， 如果类型不同，直接就是false.

