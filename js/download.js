mui.plusReady(function(){
	plus.navigator.setUserAgent("iphone;ipad;ekp-i");
	jQuery("div[onclick*=javascript]").each(function(){
		var clickjs=jQuery(this).attr("onclick");
		var url=clickjs.substring(clickjs.indexOf("(")+2,clickjs.indexOf(",")-1);
		var host=window.location.protocol+"//"+window.location.host+(window.location.port==""?"":":"+window.location.port);
		url=url.indexOf("http")==0?url:host+url;
		jQuery(this).removeAttr("onclick");
		jQuery(this).attr("data-click",url);
	})
	jQuery("div[data-click*=http]").on("click",function(event){
		var url=jQuery(this).attr("data-click");
		var wait = plus.nativeUI.showWaiting("正在打开文件...");
		if(plus.os.name=="iOS"){
			mui.openWindow("_www/att.html","att",{
		    	extras:{
		    		title:jQuery.trim(jQuery(this).text()),
		    		url:url
		    	}
		    });
			wait.close();
		}else{
		    var dtask = plus.downloader.createDownload(url, {method: "GET"}, function(d, status) {
		        if (status == 200) {
		            plus.runtime.openFile(d.filename, {}, function(e){
		                wait.close();
		                plus.nativeUI.alert( "无法打开此文件："+e.emssage,"附件" );
		            });
		            wait.close();
		        } else {
		            wait.close();
		            plus.nativeUI.alert("文件打开失败: " + status, "附件");
		        }
		    });
		    dtask.start();
		}
		return false;
	})
})
