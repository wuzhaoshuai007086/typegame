  function Typegame(){
    this.createScene();
    this.num=3;
    this.letterObj={};
    this.play();  
    this.scor=0;
    this.stage=1;
    this.life=5;
  }
  Typegame.prototype={
  	 createScene:function(){
  	 	 var that=this;
  	     $("<div class='scene'></div>").css({
  	     	width:$(window).width(),
  	     	height:$(window).height(),
  	     	background:"url(./image/0.jpg) no-repeat  #FAF2E5",
  	     	backgroundSize:"cover"
  	     }).appendTo("body");
  	     $("<div class='scor'></div>").css({
  	     	width:900,height:50,position:"absolute",
  	     	right:0,bottom:0,fontFamily:"微软雅黑",color:"yellow",fontSize:"30px",fontWeight:"bold"
  	     }).appendTo(".scene")
  	     $("<div class='bonus'>分数：0</div>").css({
  	     	width:300,height:50,float:"left",
  	     }).appendTo(".scor")
  	     $("<div class='stage'>关卡：1</div>").css({
  	     	width:300,height:50,float:"left",
  	     }).appendTo(".scor")
  	     $("<div class='life'>生命：5</div>").css({
  	     	width:300,height:50,float:"left",
  	     }).appendTo(".scor")
  	     $("<div class='pass'>恭喜过关</div>").css({
  	     	width:400,height:200,position:"absolute",
  	     	left:0,right:0,top:0,bottom:0,margin:"auto",
  	     	fontSize:"50px",textAlign:"center",display:"none"
  	     }).appendTo(".scene")
  	     $("<div>下一关</div>").css({
  	     	width:200,height:150,margin:"30px auto",cursor:"pointer",fontSize:"32px"
  	     }).appendTo(".pass").click(function(){
  	     	 $(".pass").fadeOut(300)
  	     	 that.stage++;
  	     	 $(".stage").html("关卡："+that.stage);
  	     	 that.play() 
  	     	 that.scor=0;
             $(".bonus").html("得分："+that.scor);
  	     })
  	     $("<div class='fail'>游戏结束</div>").css({
  	     	width:300,height:150,position:"absolute",
  	     	left:0,right:0,top:0,bottom:0,margin:"auto",
  	     	fontSize:"50px",color:"#BC7C1A",textAlign:"center",display:"none"
  	     }).appendTo(".scene")
  	     $("<div>重新开始</div>").css({
  	     	width:200,height:150,margin:"30px auto",cursor:"pointer",fontSize:"32px"
  	     }).appendTo(".fail").click(function(){
  	     	 $(".fail").fadeOut(300)
  	     	 that.stage=1;
  	     	 that.scor=0;
  	     	 that.num=3;
  	     	 that.life=5;
  	     	 $(".stage").html("关卡："+that.stage);
             $(".bonus").html("得分："+that.scor);
             $(".life").html("生命："+that.life);
             that.play()
  	     })
  	 },
  	 createLetter:function(){
  	 	var that=this;
  	 do{
  	 var randomNum=Math.round(Math.random()*25+65);
  	 var randomLetter=String.fromCharCode(randomNum);   
  	 }while(this.letterObj[randomLetter])
  	 do{
  	 var randomLeft=Math.round(Math.random()*800)
  	 }while(this.checkLeft(randomLeft))
  	 var randomTop=Math.round(Math.random()*200)
     var ele=$("<div></div>").css({
     	width:100,height:100,position:"fixed",
     	    left:randomLeft,top:-randomTop,background:"url(image/"+randomLetter+".png) no-repeat",backgroundSize:"contain"
     }).appendTo(".scene").animate({top:$(window).height()},5000,"linear",function(){
        that.life--;
        $(".life").html("生命："+that.life)
        that.createLetter()
        if(that.life==0){
        	$.each(that.letterObj,function(index,element){
                 element.el.remove().stop()
            })  
            that.letterObj={}; 
          $(".fail").fadeIn(300)
        }
     })
     this.letterObj[randomLetter]={s:randomLeft-50,e:randomLeft+50,el:ele}; 
  	 },
  	 play:function(){
         for (var i = 0; i < this.num; i++) {
            this.createLetter();
         };
         this.keydown()
  	 },
  	 checkLeft:function(left){
  	   var flag=false;
       $.each(this.letterObj,function(key,value){
            if(left>value.s&&left<value.e){
            	flag=true;
            	return;
            } 
       })
       return flag;
  	 },
  	 keydown:function(){
  	 	var that=this;
      console.log(that)
  	   $(document).keydown(function(e){
          var code=e.keyCode;
          var letter=String.fromCharCode(code);
          if(that.letterObj[letter]){
          	that.letterObj[letter].el.remove().stop()
          	delete that.letterObj[letter]
          	that.createLetter()
            //计算得分
          	that.scor++;
            $(".bonus").html("得分："+that.scor);
            //计算关卡 
            if(that.scor>=that.stage*10){
            	that.num++;
            $.each(that.letterObj,function(index,element){
                 element.el.remove().stop()
            })  
            that.letterObj={};   	
            $(".pass").fadeIn(500)	
            }
          }
  	   })
  	 }	 
  }