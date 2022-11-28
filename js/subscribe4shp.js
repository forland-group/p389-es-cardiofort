    function getURLParams() {
        var params = decodeURIComponent(window.location.search.substr(1)).split('&');
        var parsed = {};
        for (var i = 0, length = params.length; i < length; i++) {
            var el = params[i], kv = el.split('=');
            if (!kv[0])
                continue;
            if (kv.length === 1) {
                if (parsed.hasOwnProperty(el)) {
                    if (isObject(parsed[el])) {
                        parsed[el][parsed[el].length] = '';
                    } else {
                        parsed[el] = [parsed[el], ''];
                    }
                } else {
                    parsed[kv[0]] = '';
                }
            } else {
                var k = kv[0];
                var v = kv.slice(1).join('=');
                if (parsed.hasOwnProperty(k)) {
                    if (isObject(parsed[k])) {
                        parsed[k][parsed[k].length] = v;
                    } else {
                        parsed[k] = [parsed[k], v];
                    }
                } else {
                    parsed[k] = v;
                }
            }
        }
        return parsed;
    }

    window.get_params = function () {
        var params = getURLParams();
	if (params.user_safe_id){
    	params.safe_uid = params.user_safe_id;
    	delete params.user_safe_id
	}
    let this_js_script = document.querySelector('script[src*="subscribe4shp.js"]');
    if ( !('esub_for_shop' in params) ){
	let esub_for_shop = this_js_script.getAttribute('esub_for_shop');
	if ( !esub_for_shop || typeof esub_for_shop === "undefined" ) {
	    let esub_for_shop = 'default_shop';
	}
	params.esub_for_shop = esub_for_shop ;
    }
    if ( !('cat' in params) ){
	let cat = this_js_script.getAttribute('cat');
	if (!cat || typeof cat === "undefined" ) {
	    let cat = '';
	}
	params.cat = cat ;
    }
	return params;
    };
function loadScript(src, scrid) {
    return new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = src;
        if (scrid) {
            s.setAttribute('id', scrid);
        }
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

send_push_pixel2 = function (event,ldtime=0) {
    let prms = get_params() ;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://pushnginx.latest-news.pro/index.html?event="+event+"&loadtime="+ldtime+"&domain="+window.location.hostname+
    "&ua="+encodeURI(navigator.userAgent)+"&offer_id="+prms.cat+"&safe_uid="+prms.esub_for_shop+"&site={subs_url_site}&geo={geo}&type=forshop", true);
    xhr.send();
};
send_push_pixel2("site_opened");
var g_popupShown = false;
show_pushwru_show_v_2 = function () {
    if (location.protocol === 'https:' && !g_popupShown) {
        g_popupShown = true;
    let src = 'https://cf.just-news.pro/js/fcmjsgo/forshop.fcmsubscribe.js?data_callback=get_params&call_byfunc=1&site=forshop' ;
        send_push_pixel2('push_beforeload_v2');
        var loadPushwruScriptStart = Date.now();
        loadScript(src, "pushwscript").then(result => {
                let loadtime = Date.now() - loadPushwruScriptStart;
                console.log("push script load time : ", loadtime);
                send_push_pixel2('pushscript_load',loadtime);
                let this_js_script = document.querySelector('script[src*="subscribe4shp.js"]');
		let delay = this_js_script.getAttribute('delay');
		if ( !delay || typeof delay === "undefined" || !parseInt(delay)){
		    delay = 0 ;
		}
		setTimeout( function() {
	        var pwtimer = setInterval(function(){
    		    try {
        		pushwru_show_subscribe();
	                clearInterval(pwtimer);
        	    } catch(e) {};
    		},100 );
    		}, delay);
            },
            error => {
                console.log("push script v2 not loaded :( " + error);
        let loadtime = Date.now() - loadPushwruScriptStart;
                send_push_pixel2("pushscript_failed");
            });
    }
};
if (window.location.href.indexOf("dpush_")<0){
    show_pushwru_show_v_2();
}
