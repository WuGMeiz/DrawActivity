<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

 <h3 class="title">排行奖励</h3>
    <ul class="przShow">
        <li>
            <img src="images/prize.png" alt=""/>
            <p>第1名</p>
        </li>
        <li>
            <img src="images/prize.png" alt=""/>
            <p>第2-21名</p>
        </li>
    </ul>
    <h3 class="title">排行榜</h3>
    <div class="listScroll">
        <div class="scroll">
            <table>
                <tr>
                    <th>排名</th>
                    <th>姓名</th>
                    <th>手机号</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>王**</td>
                    <td>111****8888</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="center">
        <input type="button" value="领取奖励" class="specBtn"/>
    </div>