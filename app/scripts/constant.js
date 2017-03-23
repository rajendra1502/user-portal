/*-------------------------- setting need to change -----------------*/
var BASSBOX_HOST = "http://3d.alamatint.com:8888";
//var BASSBOX_HOST = "http://3d.alamatint.com:9000";
var appCode = "2437596329457";
var BASSBOX_COOKIE = "baasbox-cookie";
BaasBox.setEndPoint(BASSBOX_HOST);    // DB URL
BaasBox.appcode = appCode;            // App Code

var LOCAL_STORAGE_LOGIN_STATUS = localStorage.getItem("logged_in_status") ? localStorage.getItem("logged_in_status") : null;
