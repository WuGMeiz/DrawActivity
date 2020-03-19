/******************全局变量的声明以及AJAX的设置*****************************************************************************/
	var http_request = false;
	var http_request1 = false;
	var currentPos = null;
	var currentPos1 = null;
	var res_txt = new Array();
/****以上为AJAX声明方法的全局变量****/
	var MENU1=0;//导航栏1级菜单控制全局变量
	var MENU2=0;//导航栏2级菜单控制全局变量
	var MENUdvi=0;
	var path=null;
	var username=null;
	var usertype=null;
	var URL2=null;//存返回会成功后再次调用页面的路径
	var OBJ=null;//存返回会成功后再次显示页面的DIV层ID
	var fanhui=0;
	var DIV_ID="";//控制隐藏层的DIV
/*****************************************************正则表达式****************************************************/	
	var regmoney=/^\d+(\.\d+)?$/;//验证货币的正则表达式
	var reghow=/^\d+$/;//验数量必须为数字的正则表达式
	var recode=/^\d{6}$/; //验证邮箱
	var regstring = /^[A-Za-z0-9_.@-]+$/;//验证是否包含非法字符的正则表达式
	var regstr= /^[A-Za-z0-9]+$/;//验证全部是字母和数字的正则表达式
	var regstrCN= /^[^A-Za-z0-9]+$/;//验证全部不是字母和数字的正则表达式
	var regstrSY= /^[^\~\!@\#\$\%\^\&\*\(\)\_\+\|\-\,\.\<\>\？\，\。]+$/;//验证全部不是特殊字符的正则表达式
	var regphone=/^1[0-9]{10}/;//手机
	var regtel=/^([0-9]{3,4}-)|([0-9]{3,4})[1-9]{1}[0-9]{6,7}$/;//固定电话
	var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;//电子邮箱 
	var regjfq=/^[2-9]{1}[0-9]{5}/;//验证缴费期格式为：201401
	var testString=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;//不能为特殊字符
	var regURL1 = /^(((ht|f)tp(s?))\:\/\/)?(www.|[a-zA-Z].)[a-zA-Z0-9\-\.]+\.(com|edu|gov|mil|net|org|biz|info|name|museum|us|ca|uk|cn)(\:[0-9]+)*(\/($|[a-zA-Z0-9\.\,\;\?\'\\\+&%\$#\=~_\-]+))*$/;
	var regURL2 = /\b(([\w-]+:\/\/?|www[.])[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))/;
	/*****************************************************正则表达式****************************************************/	
	var BUTTONID=null;
	
function send_request(url) {//初始化、指定处理函数、发送请求的函数
	show_Loading_div();//调用打开loading提交等待图片的层
	http_request = false;
	// 开始初始化XMLHttpRequest对象
	if (window.XMLHttpRequest) {// Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {// 设置MiME类别
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) {// IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) {// 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	http_request.onreadystatechange = processRequest;
	// 确定发送请求的方式和URL以及是否同步执行下段代码
	http_request.open("GET", url, true);
	http_request.send(null);
}
function Rep_strnew(rstr) {

	rstr = rstr.replace(/\。/g, ".");
	return rstr;
}
function getRefresh() {// 封装刷新参数 适用于没有参数提交页面需要刷新的时候调用
	return "?Refresh=" + new Date().getTime();
}
function getRefreshall() {// 封装刷新参数 适用于有参数提交页面需要刷新的时候调用
	return "&Refresh=" + new Date().getTime();
}
function Rep_str(rstr) {
	rstr = rstr.replace(/\%/g, "％");
	rstr = rstr.replace(/\&/g, "＆");
	rstr = rstr.replace(/\+/g, "＋");
	rstr = rstr.replace(/\#/g, "＃");
	rstr = rstr.replace(/\\/g, "＼");
	rstr = rstr.replace(/\-/g, '－');
	rstr = rstr.replace(/\~/g, "～");
	rstr = rstr.replace(/\!/g, "！");
	rstr = rstr.replace(/\@/g, "＠");
	rstr = rstr.replace(/\$/g, "＄");
	rstr = rstr.replace(/\^/g, "＾");
	rstr = rstr.replace(/\*/g, "＊");
	rstr = rstr.replace(/\(/g, "（");
	rstr = rstr.replace(/\)/g, "）");
	rstr = rstr.replace(/\_/g, "＿");
	rstr = rstr.replace(/\=/g, "＝");
	rstr = rstr.replace(/\|/g, "｜");
	rstr = rstr.replace(/\`/g, "｀");
	rstr = rstr.replace(/\?/g, "？");
	rstr = rstr.replace(/\,/g, "，");
	rstr = rstr.replace(/\./g, "。");
	rstr = rstr.replace(/\;/g, "；");
	rstr = rstr.replace(/\'/g, "’");
	rstr = rstr.replace(/\</g, "＜");
	rstr = rstr.replace(/\>/g, "＞");

	return rstr;

}
function sendPOST(url, QString) {
	show_Loading_div();// 调用打开loading提交等待图片的层
	http_request = false;
	// 开始初始化XMLHttpRequest对象
	if (window.XMLHttpRequest) {// Mozilla 浏览器
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {// 设置MiME类别
			http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) {// IE浏览器
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {

			}
		}
	}
	if (!http_request) {// 异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	http_request.onreadystatechange = processRequest;
	http_request.open("POST", url, true);
	http_request.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
	http_request.send(QString);
}
// 处理返回信息的函数
function processRequest() {
	if (http_request.readyState == 4) {// 判断对象状态
		if (http_request.status == 200) {// 信息已经成功返回，开始处理信息
			close_loading_div();// 调用关闭loading提示图片的层
			// var res_txt = new Array();
			res_txt = http_request.responseText.split('-');// 获得返回的数据进行截取
			var temp = trim(res_txt[0]);// temp得到去掉空格后的字符串
			var PrintDescription = res_txt[1];// temp得到去掉空格后的字符串
			if (temp == "sessionOvertime") {
				alert(PrintDescription);
				window.opener = null;// 强制关闭页面
				window.open('', '_self');
				window.close();
				// window.location="login.jsp";
			} else if (temp == "errors") {// 返回失败信息调用
				alert(PrintDescription);
			} else if (temp == "ok") {// 成功类似的不需刷新页面的调用，如：添加返回主键冲突时也可调用
				alert(PrintDescription);
			} else if (temp == "sok") {// 操作成功并且是调用显示层是同MENU相同的页面调用此方法
				alert(PrintDescription);
				menu_shua(URL2);
			} else if (temp == "ssok") {// 操作成功，并且传入新的DIV层ID显示的页面调用
				alert(PrintDescription);
				showselect(OBJ, URL2);
			} else if (temp == "csok") {// 操作成功，关闭层
				alert(PrintDescription);
				close_tanchu_div(DIV_ID);
			} else if (temp == "cssok") {// 操作成功，并且传入新的DIV层ID显示的页面调用,并且关闭层
				alert(PrintDescription);
				close_tanchu_div(DIV_ID);
				showselect(OBJ, URL2);
			} else if (temp == "sssok") {// 操作成功，并且传入新的DIV层ID显示的页面调用
				alert(PrintDescription);
				document.getElementById(OBJ).innerHTML = "";
			} else if (temp == "suaok") {// 操作成功，不显示提示信息直接刷新页面
				showselect(OBJ, URL2);
			} else if (temp == "dcbbok") {// 操作成功，不显示提示信息直接刷新页面
				alert(PrintDescription);
				document.getElementById(BUTTONID).disabled = false;
			} else if (temp == "pssok") {// 操作成功，iframe保函的页面异步提交时需要刷新父级页面层时调用
				alert(PrintDescription);
				parent.showselect(OBJ, URL2);
			} else if (temp == "tb_ok") {// 操作成功并且是调用显示层是同MENU相同的页面调用此方法
				URL2 = URL2 + PrintDescription;
				showselect(OBJ, URL2);
			} else {
				document.getElementById(currentPos).innerHTML = http_request.responseText;
			}
		} else {// 页面不正常
			// alert("您所请求的页面有异常。"+http_request.status);
			// window.location="main.jsp";
			close_loading_div();// 调用关闭loading提示图片的层
		}
	}
}
function sendPOST1(url,QString) {
	show_Loading_div();//调用打开loading提交等待图片的层
	http_request1 = false;
	//开始初始化XMLHttpRequest对象
	if(window.XMLHttpRequest) {//Mozilla 浏览器
		http_request1 = new XMLHttpRequest();
		if (http_request1.overrideMimeType) {//设置MiME类别
			http_request1.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) {//IE浏览器
		try {
			http_request1 = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request1 = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				
			}
		}
	}
	if (!http_request1) {//异常，创建对象实例失败
		window.alert("不能创建XMLHttpRequest对象实例.");
		return false;
	}
	http_request1.onreadystatechange = processRequest1;
	http_request1.open("POST", url, true);
	http_request1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http_request1.send(QString);
}
//处理返回信息的函数
function processRequest1() {
	if (http_request1.readyState == 4) {//判断对象状态
		if (http_request1.status == 200) {//信息已经成功返回，开始处理信息
			close_loading_div();//调用关闭loading提示图片的层
			document.getElementById(currentPos1).innerHTML = http_request1.responseText;
		} else {//页面不正常
			//alert("您所请求的页面有异常。"+http_request.status);
			//window.location="main.jsp";
			close_loading_div();//调用关闭loading提示图片的层
		}
	}
}
//打开loading提示图片的层
function show_Loading_div(){
	var user1 =document.getElementById("Loading_div_da");
	var user2 =document.getElementById("Loading_div_xiao");
	var x1 = screen.width-300;//(window.screen.width-1024)/2;
	var y1 = screen.height-200;//(window.screen.height-768)/2;
	var x2 = window.screen.width/2;
	var y2 = window.screen.height/2-100;
	user1.style.position = "absolute";
	user1.style.width = x1 + "px";
	user1.style.height = y1 + "px";
	user1.style.left = 0 + "px";
	user1.style.top = 0 + "px";
	user1.style.display = "block";
	user2.style.display = "block";
	user2.style.position = "absolute";
	user2.style.left = x2 + "px";
	user2.style.top = y2 + "px";
}
/* 关闭弹出的层 */
function close_tanchu_div(ID) {
	var userInfo = document.getElementById(ID);
	userInfo.style.display = "none";
}
// 关闭loading提示图片的层
function close_loading_div() {
	var user1 = document.getElementById("Loading_div_da");
	var user2 = document.getElementById("Loading_div_xiao");
	user1.style.display = "none";
	user2.style.display = "none";
}
/** **去空格的方法****************************************************************************** */
function ltrim(s) {// 去左空格;
	return s.replace(/^\s*/, "");
}
function rtrim(s) {// 去右空格;
	return s.replace(/\s*$/, "");
}
function lrtrim(s) {// 去左右空格;
	return s.replace(/^\s+|\s+$/g, "");
}
function trim(s) {// 去全部空格;
	return s.replace(/\s+/g, "");
}
/** ******************************************************************************************** */
/****---------快捷支付交易大赛-----------****/


