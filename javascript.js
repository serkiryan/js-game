var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var balls = {
    white:{
        w1:{x: 500,y: 250,sx: 0,sy: 0,run: 0}
    },
    red:{
        r1:{x: 50,y: 250,sx: 0,sy: 0,run: 0},
        r2:{x: 150,y: 75,sx: 0,sy: 0,run: 0},
        r3:{x: 150,y: 425,sx: 0,sy: 0,run: 0},
        r4:{x: 350,y: 175,sx: 0,sy: 0,run: 0},
        r5:{x: 350,y: 325,sx: 0,sy: 0,run: 0}
    },
    blue:{
        b1:{x: 950,y: 250,sx: 0,sy: 0,run: 0},
        b2:{x: 800,y: 75,sx: 0,sy: 0,run: 0},
        b3:{x: 800,y: 425,sx: 0,sy: 0,run: 0},
        b4:{x: 650,y: 175,sx: 0,sy: 0,run: 0},
        b5:{x: 650,y: 325,sx: 0,sy: 0,run: 0}
    }
};
var r = 20;
var s = 1;
var stop = 1;
var color = "white";
var number = "w1";
var s_x = 100;
var click = 0;

function getKeyByValue( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
};

function collision(v_i, v_x, v_y){
    var ball = {};
    $.each(balls, function(index, value) {
//        ball[index]={};
        $.each(value, function(i, v) {
                var x = balls[index][i].x;
                var y = balls[index][i].y;
		var d = ((x-v_x)*(x-v_x)+(y-v_y)*(y-v_y))/(v_i==="click"?1:4);
//                console.log(d);
                if(index != v_i && d <= r*r){
                    ball = v;
                    ball.c = index;
                    ball.n = i;
                }
        });
    });
    return ball;
}

function position(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,150,10,200);
    ctx.fillRect(991,150,10,200);

    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.fillRect(499,0,2,500);
    $.each(balls, function(index, value) {
            ctx.fillStyle = index;
        $.each(value, function(i, v) {
            ctx.beginPath();
            ctx.arc(v.x,v.y,r,0,2*Math.PI);
            ctx.fill();
            if(index == color && i == number){
//                console.log(collision(index, v.x, v.y));
                var obj = collision(index, v.x, v.y);
                var length = Object.keys(obj).length;
//                console.log(length);
                if( length == 0 && ((v.sx > 0.1 || v.sx < -0.1) || (v.sy > 0.1))){
                    if(v.x > 980){
                        v.sx = -2;
                    }
                    v.x+=v.sx;
                    //v.sx/=1.1;
                    v.y+=v.sy;
                    //v.sy/=1.1;
					
                }else if(length != 0 && v.run){
                    v.sx = 0;
                    v.run = 0;
                    balls[obj.c][obj.n]['x'] += 1;
                    balls[obj.c][obj.n]['sx'] = 1;
                    balls[obj.c][obj.n]['run'] = 1;
                    color=obj.c;
                    number=obj.n;
                    console.log(balls, color, number);
                    //stop = 1;
                }
            }
        });
    });
    if(!stop){
        requestAnimationFrame(position);
    }
}
position();
//requestAnimationFrame(position);
//setInterval(position, 100);

//$.each(balls, function(index, value) {
//        ctx.fillStyle = index;
//    $.each(value, function(i, v) {
//        ctx.beginPath();
//        ctx.arc(v.x,v.y,25,0,2*Math.PI);
//        ctx.fill();
//    });
//});

canvas.onclick = function(e){
    click=10;
    
        var x = e.offsetX;
        var y = e.offsetY;
        var resp = collision('click', x, y);
        var c = resp.c;
        var n = resp.n;
//        console.log(x,y,resp, balls);
        stop = 0;
        color = c;
        number = n;
        balls[c][n]['sx'] = 1;
        balls[c][n]['sy'] = 0;
        balls[c][n]['run'] = 1;
    
    
    for(var i = 0; i<click; i++){
        requestAnimationFrame(position);
    }
};

