<%@page import="yxpkclass.T_time"%>
<%@page import="rankingList.bean.TB_MK_Prize"%>
<%@page import="rankingList.dao.MyTBRank"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
 String Act_Id="13";
 if(session.getAttribute("YX_USER_ID")==null){
	String url=request.getContextPath()+"/FrontPage/login.jsp";
	out.println("<script>alert('请先登录！')");
    out.println("window.location='"+url+"';");
    out.println("</script>");
 }else{
    String phone=session.getAttribute("YX_USER_PHONE").toString();
    String zcuser_id=session.getAttribute("YX_USER_ID").toString();
 
%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="Copyright" content="cowell" />
    <meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>建行卡快捷支付交易大赛</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/FrontPage/dealMatch/css/css.css" />
    <script src="<%=request.getContextPath() %>/FrontPage/dealMatch/js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/FrontPage/dealMatch/js/draw.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/FrontPage/dealMatch/js/js.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/FrontPage/dealMatch/js/index.js"></script>
    <script type="text/javascript">
        (function (doc, win) {
            var docEl = doc.documentElement,
                    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', recalc = function () {
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        clientWidth = (clientWidth > 375) ? 375 : clientWidth ;
                        docEl.style.fontSize =clientWidth / 3.75 + 'px';
                    };
            if (!doc.addEventListener) return; win.addEventListener(resizeEvt, recalc, false);
            recalc();
        })(document, window);
    </script>
</head>
<body>
<!--活动标题-->
<div class="actvName">
    <img src="images/adv.png" alt=""/>
</div>
<!--活动入口-->
<ul class="entry">
    <li onclick="turnEntry(0)">排行榜</li>
    <li onclick="turnEntry(1)">幸运抽奖</li>
</ul>
<!--活动模块-->
<div class="active">
   <jsp:include flush="true" page="rand.jsp"></jsp:include>
</div>
<%
	String monthks=new T_time().getTimeym()+"-01";  //当月第一天日期
	int tian=new T_time().getTMontCount();
	String monthjs=new T_time().getTimeym()+"-"+tian;  //当月最后一天日期
	int month=Integer.parseInt(T_time.getLastMonth()); //获取上个月的月份
	Map<String,String> map=new MyTBRank().selWhiteID(month,Act_Id); //获取白名单用户
	int count=0;
	if(map.containsKey(phone)){
	  //白名单用户当月是否抽过奖
	  int cjnum=new MyTBRank().select_DrawMess(Act_Id, zcuser_id, phone, monthks, monthjs); 
	  if(cjnum==0){
	    count=1;
	  }
	}
	List<TB_MK_Prize> list = new MyTBRank().select_prize(Act_Id);
%>
<div class="active">
    <ul class="desktop clear">
       <% 
        TB_MK_Prize prizes = null;
        for(int i=0;i<3;i++){
          prizes = list.get(i);
        %>
       <li class="prizeList " datatype="<%=i+1%>">
           <img src="data:image/jpg;base64,<%=prizes.getPrize_Image() %>" alt="" />
        </li>
	    <% 
	      }
	     %>
        <li class="prizeList " datatype="4">
            <img src="images/thank.png" alt="" />
        </li>
        <li class="prizeBtn">
          <%if(count==1){%>
             <input type="button" value="开始抽奖" class="activeBtn" onclick="ltry();getPrzImg();" />
          <%}else{%>
              <input type="button" value="开始抽奖" class="activeBtn" onclick="ltry_no();" />
          <%} %>
        </li>
        <li class="prizeList" datatype="5">
            <img src="images/thank.png" alt="" />
        </li>
        <%
          prizes=null;
         for(int i=3;i<6;i++){
           prizes = list.get(i);
       %>
       <li class="prizeList " datatype="<%=i+3%>">
           <img src="data:image/jpg;base64,<%=prizes.getPrize_Image() %>" alt="" />
      </li>
	    <% 
	      }
	     %>
    </ul>
    <p class="chance">您还有<%=count %>次抽奖机会</p>
    <input type="hidden" id="zcuser_id"  name="zcuser_id"  value="<%=zcuser_id%>" />
    <input type="hidden" id="Phone"  name="Phone"  value="<%=phone%>" />
    <input type="hidden" id="Act_Id" name="Act_Id"  value="<%=Act_Id%>" />
</div>
<!--获奖信息-->
  <jsp:include page="prize.jsp">
	 <jsp:param value="<%=Act_Id %>" name="Act_Id"/>
	 <jsp:param value="<%=phone %>" name="Phone"/>
	 <jsp:param value="<%=zcuser_id %>" name="zcuser_id"/>
 </jsp:include>

<!--活动规则-->
<div class="section">
    <h4>活动规则</h4>
    <div class="article box">
        <p class="noInd">一、活动时间</p>
        <p>2020年3月1日-2020年7月31日</p>
        <p class="noInd">二、活动内容</p>
        <p>入邀请码，获得一次掷色子机会。系统后台提前为二级行提供一定数量的邀请码，二级行自行掌握送给客户，客户通过邀请码可活动一次掷色子机会。输入邀请码，获得一次掷色子机会。系统后台提前为二级行提供一定数量的邀请码，二级行自行掌握送给客户，客户通过邀请</p>
        <p>入邀请码，获得一次掷色子机会。系统后台提前为二级行提供一定数量的邀请码，二级行自行掌握送给客户，客户通过邀请码可活动一次掷色子机会。输入邀请码，获得一次掷色子机会。系统后台提前为二级行提供一定数量的邀请码，二级行自行掌握送给客户，客户通过邀请</p>
    </div>
</div>
<!--弹窗-->
<div class="floor hidden">
    <!--中奖提示-->
    <div class="winPrz flr">
        <div class="close" onclick="closeFlr(this);"></div>
        <div class="window">
            <div class="card">
                <p class="ltrResult">恭喜你中奖了</p>
                <img src="images/prizes.jpg" alt=""/>
            </div>
            <div class="center">
               <input type="button" value="确定" class="specBtn" onclick="closeFlr('.winPrz');Refresh();"/>
            </div>
        </div>
       
    </div>
        <!--核对手机号-->
    <div class="phoneNum flr">
        <div class="close" onclick="closeFlr(this);"></div>
        <div class="window">
            <h4 class="tipTit">温馨提示</h4>
            <div class="tipTxt">
                <p class="tipMsg">请输入手机号：</p>
                <input type="text" maxlength="11" minlength="11" required="required" class="tipInp" placeholder="输入注册手机号"/>
            </div>
            <div class="center">
                <input type="button" class="specBtn" value="确认" />
            </div>
        </div>
    </div>
    <div class="buy flr">
        <div class="close" onclick="closeFlr(this);"></div>
        <div class="window">
            <div class="wareBrief">
                <img src="images/prize.png" alt=""/>
                <p class="wareName"><span>华为meta20手机</span></p>
            </div>
            <div class="receiveInfo">
                <h4 class="infoLine">请确认收货信息：</h4>
                <p class="infoLine">
                    <span>姓名：</span>
                    <input type="text" class="infoInp" value="张**"/>
                </p>
                <p class="infoLine">
                    <span>电话：</span>
                    <input type="text" class="infoInp" value="155****8888"/>
                </p>
                <p class="infoLine">
                    <span>地址：</span>
                    <span class="infoSel">
                        <select name="">
                            <option value="">山西省</option>
                        </select>
                    </span>
                    <span class="infoSel">
                        <select name="">
                            <option value="">太原市</option>
                        </select>
                    </span>
                    <span class="infoSel">
                        <select name="">
                            <option value="">迎泽区</option>
                        </select>
                    </span>
                    <input type="text" class="infoInp" value="迎泽公园"/>
                </p>
                <p class="tips">为保证奖品顺利送达，请确认收获信息</p>
                <input type="button" class="specBtn" value="确定"/>
            </div>
        </div>
    </div>
</div>
</body>
</html>
<% }%>