Jumei.widget("ui.scratchcard",{init:function(){this.options={width:232,height:45,img:"http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area-un.jpg",backgroundImg:"http://p0.jmstatic.com/mobile/act/active301/702luodi/prize-area.png"},this.tpl='<canvas class="canvas"></canvas>'},_create:function(){try{document.createElement("canvas").getContext("2d")}catch(e){return alert("对不起，您的浏览器不支持刮刮卡功能"),!1}this.initCanvas()},initCanvas:function(){var bodyStyle=document.body.style,self=this,img=new Image,undoImg=new Image,canvas=$(self.element).find(".canvas")[0];canvas||($(self.element).html(self.tpl),canvas=self.element.querySelector(".canvas")),bodyStyle.mozUserSelect="none",bodyStyle.webkitUserSelect="none",canvas.style.backgroundColor="transparent",canvas.style.position="absolute",undoImg.addEventListener("load",function(e){function layer(e){e.scale(.5,.5),e.fillStyle=pat,e.fillRect(0,0,2*w,2*h)}function eventDown(e){e.preventDefault(),mousedown=!0}function eventUp(e){e.preventDefault(),mousedown=!1}function eventMove(e){if(e.preventDefault(),mousedown){e.changedTouches&&(e=e.changedTouches[e.changedTouches.length-1]);var x=(e.clientX+document.body.scrollLeft||e.pageX)-$(canvas).offset().left*Jumei.scale,y=(e.clientY+document.body.scrollTop||e.pageY)-$(canvas).offset().top*Jumei.scale;with(ctx)beginPath(),arc(2*x,2*y,30,0,4*Math.PI),fill()}}var ctx,pat,w=img.width,h=img.height,mousedown=!1;canvas.width=w,canvas.height=h,canvas.style.backgroundImage="url("+self.options.backgroundImg+")",canvas.style.backgroundSize="cover",ctx=canvas.getContext("2d"),pat=ctx.createPattern(undoImg,"no-repeat"),ctx.fillStyle="transparent",ctx.fillRect(0,0,w,h),layer(ctx),ctx.globalCompositeOperation="destination-out",canvas.addEventListener("touchstart",eventDown),canvas.addEventListener("touchend",eventUp),canvas.addEventListener("touchmove",eventMove),canvas.addEventListener("mousedown",eventDown),canvas.addEventListener("mouseup",eventUp),canvas.addEventListener("mousemove",eventMove)}),undoImg.src=self.options.img,undoImg.width=self.options.width,undoImg.height=self.options.height,img.src=self.options.backgroundImg,img.width=self.options.width,img.height=self.options.height}});