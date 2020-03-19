/**
 * Created by Administrator on 2019/6/28.
 */
/* TODO 中奖信息滚动 */
function prizeScr(){
    var list=$(".game_win .game_win_window ul");
    var listn=list.find("li").length;
    list.find("li").eq(0).clone().appendTo(list);          //显示几行就多插入几个;
    var index1=1;
    setInterval(function(){
        if(index1<listn+1){
            list.animate({top:-0.52*index1+'rem'},500);
        }else{
            index1=1;
            list.animate({top:0},1);
            list.animate({top:-0.52*index1+'rem'},500);
        }
        index1++;
    },3000);
}
//抽奖次数不足
function ltry_no(){
	alert("抽奖次数不足！");
}
function Refresh(){
	location.reload();
}
/* TODO 抽奖动作*/
function ltry(){
    $(".desktop .prizeBtn").find("input[type=button]").attr("disabled","disabled");
    var zcuser_id = document.getElementById("zcuser_id").value; //白名单用户主键
	var Phone = document.getElementById("Phone").value; // 手机号
	var Act_Id = document.getElementById("Act_Id").value; //活动主键
    $.ajax({
        //传中奖信息
		type : 'POST',// 提交方式
		async : false,// 同步
		url : 'draw.rand',
		data : 'zcuser_id=' + zcuser_id +'&Act_Id=' + Act_Id+'&Phone='+Phone,
		dataType : 'json',//
		success : function(data) {
			if (data.State == "no") {//判断状态是否中奖
				result = data.State;
				result2= data.zjjg;  //谢谢参与
				result3 = "谢谢参与";
			} else {
				result = data.State;
				result2 = "获得"+data.zjjg;
				result3 = "获得:"+data.jp_name;//奖品名称
			}
		}
	
    });
    //var state = true;
    var a=Math.floor(Math.random()*2);
	var info;
	 //中奖提示
    if(result2=="获得一等奖"){
    	info = "1";
	}else if(result2=="获得二等奖"){
    	info = "2";
	}else if(result2=="获得三等奖"){
    	info = "3";
	}else if(result2=="获得四等奖"){
		info="6";
	}else if(result2=="获得五等奖"){
		info="7";
	}else if(result2=="获得六等奖"){
		info="8";
	}else{ 
		if(a==0){
			info="4";  
		}else {
		    info="5";  
	    }
	}
    var val = info;  //传回的中奖位置
    var time = 250; //初始切换间隔
    var circle = 0; //存放转动的圈数
    var order = 0;
    var arr = new Array(1,2,3,5,8,7,6,4);   //存储滚动顺序
    var td = $(".desktop .prizeList");
    var myFunction = function(){
        if(circle < 2){     //滚动开始时时间间隔逐渐减小
            if(time > 100){
                time -= 50;
            }
        }else if(circle > 4){   //滚动即将结束时时间间隔逐渐增大
            if(time < 500){ //
                time += 50;
            }
        }
        var highPos = arr[order];   //存放高亮位置
        order ++ ;
        if(order > 7){    //每次转完一圈就返回1并记录状态
            order= 0;
            circle ++;
        }
        td.each(function(){
            var ind = $(this).attr("datatype");
            if(ind == highPos){
                $(this).addClass("on").siblings().removeClass("on");
            }
        });

        if(circle > 5 && highPos == val){
            setTimeout(function(){
                //alert("中奖了");
                showThis(".winPrz");
                if(result=="no"){
               	 $(".floor .window .ltrResult").text("很遗憾您未中奖！");
               }
                $(".desktop .prizeBtn").find("input[type=button]").removeAttr("disabled");
            }, time);
        }else{
            timer1 = setTimeout(myFunction, time);
        }
    };
    var timer1 = setTimeout(myFunction, time);
}