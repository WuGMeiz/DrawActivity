<%@page import="rankingList.bean.TB_MK_DrawMess"%>
<%@page import="rankingList.dao.MyTBRank"%>
<%@page import="yxpkclass.S_string"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<% 
String Act_Id=S_string.formatString(request.getParameter("Act_Id"));
String Phone=S_string.formatString(request.getParameter("Phone"));
String zcuser_id=S_string.formatString(request.getParameter("zcuser_id"));
List<TB_MK_DrawMess> list=new MyTBRank().select_drawMess(Act_Id, Phone, zcuser_id);
%>

<div class="section">
    <h4>我的奖品</h4>
    <div class="box">
        <div class="scroll">
            <table>
                <tr>
                    <th>奖品名称</th>
                    <th>获奖日期</th>
                    <th>领取状态</th>
                </tr>
           <%
            if(list.size()>0){
		      for(int i=0;i<list.size();i++){
		      TB_MK_DrawMess mess=(TB_MK_DrawMess) list.get(i);
	        %>
	           <tr>
                    <td><%=mess.getPri_Name()%></td>
	                <td><%=mess.getDraw_Time() %></td>
	                <td><%if(mess.getIs_Take()==0){ %>未领取<%}else{ %>已领取<%} %></td>
                   <%--  <td>
	                 <%
	                   //判断奖品是实物还是虚拟物品
	                  if(mess.getPrize_Type()==2){//虚拟奖品
	                     //判断是否已领取：0未领取，1已领取
						if(mess.getIs_Take()==0){//未领取查询兑换券表数据库进行抽取
	                 %>
	                     <div onclick="xnwp_lqcode('<%=mess.getDraw_id() %>','<%=mess.getPri_ID() %>','showcode','<%=request.getContextPath()%>/CodeRand','<%=request.getContextPath()%>/FrontPage/userprizes.jsp');"><font color='blue' >去领奖</font></div>
	                 <%
	                   }else if(mess.getIs_Take()==1){
	                     TB_MK_Code code = new MyTB_MK_Prize().select_code(mess.getCodeid(), mess.getPri_ID());
	                  %>
	                    <div onclick="xnwp_code('<%=code.getRedeem_Code()%>','<%=code.getVerification_Code()%>');"><font color='green' >已领奖</font></div>
	                  <%
	                    }
	                   }else if(mess.getPrize_Type()==1){ //实物
	                     //判断是否发奖
						if(mess.getIs_GiveOut()==0){
						  if("".equals(mess.getReceipt_ID())|| mess.getReceipt_ID()==0){
	                   %>
	                      <a onclick="showThis1('.przHist','<%=mess.getDraw_id()%>');"><font color='blue' >去领奖</font></a>
	                   <%}else{%>
	                      <font color='green' >已领奖</font>
	                  <% }
	                  }else if(mess.getIs_GiveOut()==1){
	                  %>
	                    <div onclick="is_GiveOut()"><a><font color='red' >奖品已发放</font></a></div>
	                  <%
	                  }
	                  
	                  %>
	                  
	                </td> --%>
                </tr>
	        <%}}else{ %>
	           <tr>
                    <td colspan="3">暂无获奖信息</td>
                </tr>
	        <%} %>
             
            </table>
        </div>
    </div>
</div>
