/**
 * Created by wangy on 2020/2/26.
 */

$(function(){
    turnEntry(0);
});
function turnEntry(ind){
    $(".entry li").eq(ind).addClass("on").siblings().removeClass("on");
    $(".active").eq(ind).addClass("on").siblings().removeClass("on");
}
function getPrzImg(){
    var imgSrc;
    var timer = setInterval(function(){
        imgSrc = $(".desktop .prizeList.on img").attr("src");
        if($(".floor .winPrz").visibility){
            clearInterval(timer);
        }
        $(".winPrz .card img").attr("src",imgSrc);
    },200);
}
/*关闭任务层*/
function closeFlr(obj){
    var layLen =  $(obj).parents(".flr").length;
    var floor = $(obj).parents(".floor");
    if(layLen < 1){
        $(obj).hide();
    }else{
        $(obj).parents(".flr").hide();
    }
    setTimeout(function(){
        maskCheck(floor);
    },100);
}
/*弹出层后阻止底层滚动*/
function pvtScroll(){
    var body = $("body");
    var state = body.css("position");
    if( state != "fixed"){
        var scrTop = $(window).scrollTop();     //获取当前页面卷起高度
        body.css({"position":"fixed","left":"0","right":"0","margin":"auto","top":-scrTop +"px"});  //对body设置定位属性，阻止滚动
    }
}
/*关闭弹出层后还原页面*/
function reduction(){
    var body = $("body");
    var scrTop = parseInt(body.css("top")); //获取之前页面卷起高度（负值）并转换为整型
    body.css({"position":"","left":"","right":"","margin":"","top":""});   //移除body的定位属性
    $(window).scrollTop(-scrTop);           //还原之前页面卷起高度
}
/*打开其他弹出层*/
function showThis(obj){
    pvtScroll();
    $(obj).show().parents(".floor").removeClass("hidden");
}
/*判断是否保留遮罩层*/
function maskCheck(obj){
    var winLen = obj.children(".flr").length;
    var i = 0;
    obj.children(".flr").each(function(){
        if($(this).css("display") == "none"){
            i++;
        }
        if(i == winLen){
            obj.addClass("hidden");  //关闭弹出层
            reduction();
        }
    });
}
/*自定义alert*/
function myAlert(text){
    $(".floor .alert").remove();
    var aleWindow = $("<div class='alert flr'>" +
        "<div class='window'>" +
        "<h4 class='tipTit'>温馨提示</h4>" +
        "<div class='tipTxt'>" +
        "<p class='tipMsg'></p></div>" +
        "<div class='center'><input type='button' class='specBtn' value='确定' onclick='closeFlr(this);' /></div>" +
        "</div></div>");
    aleWindow.find(".tipMsg").text(text);
    closeFlr(".flr");
    $(".floor:last").append(aleWindow);
    showThis(".alert");
}