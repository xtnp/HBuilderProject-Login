jQuery(function(){
	jQuery("div[onclick*=javascript]").on("click",function(event){
		var clickjs=jQuery(this).attr("onclick");
		var url=clickjs.substring(clickjs.indexOf("(")+2,clickjs.indexOf(",")-1);
		var host=window.location.protocol+"//"+window.location.host+(window.location.port==""?"":":"+window.location.port);
		url=url.indexOf("http")==0?url:host+url;
		jQuery(this).removeAttr("onclick");
		var wait = plus.nativeUI.showWaiting("正在打开文件...");
	    var dtask = plus.downloader.createDownload(url, {method: "GET"}, function(d, status) {
	        if (status == 200) {
	            plus.runtime.openFile(d.filename, {}, function(e){
	                wait.close();
	                plus.nativeUI.alert( "无法打开此文件："+e.emssage,"我的软件" );
	            });
	            wait.close();
	        } else {
	            wait.close();
	            plus.nativeUI.alert("文件打开失败: " + status, "我的软件");
	        }
	    });
	    dtask.start();
		jQuery(this).attr("onclick",clickjs);
		return false;
	})
})
