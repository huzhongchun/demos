/*矢量坐标*/
Vector2 = function(x, y) { this.x = x; this.y = y; };

Vector2.prototype = {
    copy : function() { return new Vector2(this.x, this.y); },
    length : function() { return Math.sqrt(this.x * this.x + this.y * this.y); },
    sqrLength : function() { return this.x * this.x + this.y * this.y; },
    normalize : function() { var inv = 1/this.length(); return new Vector2(this.x * inv, this.y * inv); },
    negate : function() { return new Vector2(-this.x, -this.y); },
    add : function(v) { return new Vector2(this.x + v.x, this.y + v.y); },
    subtract : function(v) { return new Vector2(this.x - v.x, this.y - v.y); },
    multiply : function(f) { return new Vector2(this.x * f, this.y * f); },
    divide : function(f) { var invf = 1/f; return new Vector2(this.x * invf, this.y * invf); },
    dot : function(v) { return this.x * v.x + this.y * v.y; }
};

Vector2.zero = new Vector2(0, 0);


/*颜色类*/

Color = function(r, g, b) { this.r = r; this.g = g; this.b = b };

Color.prototype = {
    copy : function() { return new Color(this.r, this.g, this.b); },
    add : function(c) { return new Color(this.r + c.r, this.g + c.g, this.b + c.b); },
    multiply : function(s) { return new Color(this.r * s, this.g * s, this.b * s); },
    modulate : function(c) { return new Color(this.r * c.r, this.g * c.g, this.b * c.b); },
    saturate : function() { this.r = Math.min(this.r, 1); this.g = Math.min(this.g, 1); this.b = Math.min(this.b, 1); }
};

Color.black = new Color(0, 0, 0);
Color.white = new Color(1, 1, 1);
Color.red = new Color(1, 0, 0);
Color.green = new Color(0, 1, 0);
Color.blue = new Color(0, 0, 1);
Color.yellow = new Color(1, 1, 0);
Color.cyan = new Color(0, 1, 1);
Color.purple = new Color(1, 0, 1);
Color.moutchColor = new Color(236/255, 44/255, 103/255);




/* 
* @requires Vector2, Color
* 粒子属性
*/
Particle = function(position, velocity, life, color, size, random) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = Vector2.zero;
    this.age = 0;
    this.life = life;
    this.color = color;
    this.size = size;
    this.random = random;
 };




/* 
* @requires Vector2, Color, Particle
* 粒子系统类
*/
function ParticleSystem() {
    // Private fields
    var that = this;
    var particles = new Array();

    // Public fields
    this.gravity = new Vector2(0, 100);
    this.effectors = new Array();

    // Public methods
        
    this.emit = function(particle) {
        particles.push(particle);
    };

    this.simulate = function(dt) {
        aging(dt);
        applyGravity();
        applyEffectors();
        kinematics(dt);
    };
    
    var imageArr = [];
    
    for(var i = 1; i < 11; i++){
        var image = new Image();
        image.src= Jumei.static + "/image/redbag/"+i+".png";
        imageArr.push(image);
    }
    
    this.render = function(ctx) {
        for (var i in particles) {
            var p = particles[i];
            var alpha = 1 - p.age / p.life;
            ctx.globalAlpha = alpha.toFixed(2);
            ctx.drawImage(imageArr[p.random], p.position.x, p.position.y, 2*p.size, 2*p.size);
            ctx.fill();
        }
    }

    // Private methods
    
    function aging(dt) {
        for (var i = 0; i < particles.length; ) {
            var p = particles[i];
            p.age += dt;
            if (p.age >= p.life)
                kill(i);
            else
                i++;
        }
    }

    function kill(index) {
        if (particles.length > 1)
            particles[index] = particles[particles.length - 1];
        particles.pop();
    }

    function applyGravity() {
        for (var i in particles)
            particles[i].acceleration = that.gravity;
    }

    function applyEffectors() {
        for (var j in that.effectors) {
            var apply = that.effectors[j].apply;
            for (var i in particles)
                apply(particles[i]);    
        }
    }
    
    function kinematics(dt) {
        for (var i in particles) {
            var p = particles[i];
            p.position = p.position.add(p.velocity.multiply(dt));
            p.velocity = p.velocity.add(p.acceleration.multiply(dt));
        }
    }
}




/* 
* @requires Vector2, Particle
* 撞击类
*/
function ChamberBox(x1, y1, x2, y2) {
    this.apply = function(particle) {
        if (particle.position.x - particle.size < x1 || particle.position.x + particle.size > x2)
            particle.velocity.x = -particle.velocity.x;

        if (particle.position.y - particle.size < y1 || particle.position.y + particle.size > y2)
            particle.velocity.y = -particle.velocity.y;
    };
}



var Game = {
    init: function(){
        /*游戏渲染类*/
        var canvas, ctx, isContinue, timeoutID, clientx, clienty;

        this.setClient = function(x,y){
            clientx = x;
            clienty = y;
        };
        this.start = function(canvasName, func) {
            if (timeoutID)
                stop();

            canvas = document.getElementById(canvasName);
            ctx = canvas.getContext("2d");
            isContinue = true;

            var loop = function() {
                func(clientx,clienty);
                if (isContinue)
                    timeoutID = setTimeout(loop, 10);
            }
            loop();
          
//            var image = new Image();
//            image.src="012.png";
//            canvas = document.getElementById(canvasName);
//            ctx = canvas.getContext("2d");    
//            var num=0;
//            
//            var list = [];
//            for(var j = 0; j < 15; j++){
//                var x = Math.random()*320;
//                var y = Math.random()*568;
//                list.push({'x':x,'y':y});
//            }
//            
//            function draw()
//            {
//                num+=1;
//                if(num==60)
//                num=1;
//                ctx.clearRect(0,0,canvas.width,canvas.height); 
//                for(var i = 0; i< list.length; i++){
//                    var theta = Math.random() * 10 * Math.PI;
//                    console.dir(Math.cos(theta),Math.sin(theta));
//                    list[i].x = list[i].x + Math.cos(theta);
//                    list[i].y = list[i].y + Math.sin(theta);
//                    ctx.save();
//                    ctx.globalAlpha= i/10;
//                    ctx.translate(list[i].x,list[i].y);
//                    ctx.rotate(num*(Math.PI/30));
//                    ctx.drawImage(image, -7.5,-7.5 ,15,15);
//                    ctx.restore();	
//                }
//                setTimeout(function(){draw()},200);
//            }
//            draw();
            
            
        }

        function stop() {
            clearTimeout(timeoutID);
            isContinue = false;
        }

        function clearCanvas() {
            if (ctx != null)
                ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        this.stop = stop;
        this.clearCanvas = clearCanvas;
        
        /*主程序*/
        var ps = new ParticleSystem();
        var dt = 0.01;
        function sampleDirection() {
            var theta = Math.random() * 10 * Math.PI;
            return new Vector2(Math.cos(theta), Math.sin(theta));
        }
        this.step = function(x,y){
            var random = Math.floor(Math.random()*5);
            var randomImage = Math.floor(Math.random()*10);
           // console.dir(2*p.size+random);
            ps.emit(new Particle(new Vector2(x, y), sampleDirection().multiply(500), 0.4, Color.moutchColor, 10+random, randomImage));
            ps.simulate(dt);
            clearCanvas();
            ps.render(ctx);
        }
    }
};