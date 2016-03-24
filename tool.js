
/*

   仿jquery extend方法

*/
function extend(){

    var target = arguments[0] || {},
    length = arguments.length;
    i = 1,deep = false,name,clone,src,copyisArray,options;

    if(typeof target === "boolean"){
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    if(typeof target === "object" && type(target) !== "function"){
        target = {};
    }

    if(i === length){
        target = this;
        i--;
    }

    for( ; i < length ;i++){

        if((options = arguments[i])!=null){

            for(name in options){

                src = target[name];
                copy = options[name];

                if(target === copy){
                    continue;
                }

                if(deep && copy && ( isPlainObject(copy) || ( copyisArray = type(copy) === "array" )  ） ){

                    if(copyisArray){
                    	copyIsArray = false;
                        clone = src && type(src) === "array" ? src : [];
                    }else{
                        clone = src && type(src) === "object" ? src : {};
                    }

                    target[name] = extend(deep,clone,copy);

                } else if(copy !== undefined){
                    target[name] = copy;
                }

            }

        }

    }
}


/*

  合并两个数组或array like 对象

*/

function merge(first,second){
	
	var len = +second.length,
	j = 0;
	i = first.length;
	
	for( ; j < len ; j++ ){
		first[i++] = second[j];
	}
	
	first.length = i;
	
	return first;
	
}






/*

  判断一个对象是否是plain empty object

*/


function isPlainEmptyObject(obj){
	
	
	if(!isPlainObject(obj)){
		return false;
	}
	
	return this.isEmptyObject(obj);
	
	
}



/*

   判断一个数组和对象是否是empty
   
   只要传入的obj对象没有emunerable=true的属性，就返回true

*/.

function isEmptyObject(obj){
	var name;
	for(name in obj){
		return false;
	}
	return true;
}


/*
   
   判断传入参数是否是plain object

*/


function isPlainObject(obj){
	
	if(type(obj) !== "object" || obj.nodeType || isWindow(obj)){
		return false;
	}
	
	if(obj.constructor && Object.prototype.hasOwnProperty.call( obj.constructor.prototype,"isPrototypeOf")){
		return false;
	}
	
	return true;
	
}



/*

  判断传入参数是否是ArrayLike对象

*/

function isArrayLike(obj){
	
	var length = !!obj && "length" in obj && obj.length,
	    type = type(obj);
	
	if(type === "function" || isWindow(obj)){
		return false;
	}
	
	return type === "array" || length === 0 || typeof +length === "number" && length > 0 && (length - 1) in obj;
	
}



/*
 
 判断obj是否是数字或数字格式字符串
 
*/

function isNumeric(obj){
  
  var str = obj && obj.toString();
  
  return type(obj)!=="array" && ( str - parseFloat( str ) + 1 ) >= 0;
  
}

/*
  判断一个对象是否是window对象
*/

function isWindow( obj ) {
	return obj != null && obj === obj.window;
}


/*
  数组乱序最快方法
*/
if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    }
}

/*
  判断传入的参数的类型
*/
function type(arg){
    var t = typeof arg,s;
    if(t === 'object'){
        if(arg === null){
            return 'null';
        }else{
            s = Object.prototype.toString.call(arg);
            //return s.slice(8,s.length-1).toLowerCase();
            return s.slice(8,-1).toLowerCase();
        }
    }else{
        return t;
    }
}



/*
  判断IE浏览器版本
  可以判断IE6 7 8 9
  不能判断IE10 11
*/
function isIE(ver){
  var b = document.createElement("b");
  b.innerHTML = "<!--[if IE "+ver+"]><i></i><![end if]-->"
  return b.getElementsByTagName('i').length === 1;
}

/*

  新的判断IE版本的函数，可以判断所有IE版本
  非IE返回NaN
*/

function IE() {
    // 能进到这里来，说明一定是IE
    if (window.VBArray) {
    	// 取出IE的版本
        var mode = document.documentMode
        // IE6、IE7 不支持documentMode，那就使用XMLHttpRequest，支持的就是IE7，否则就是IE6
        // 至于支持documentMode的IE，则直接return
        return mode ? mode : window.XMLHttpRequest ? 7 : 6
    } else {
        return NaN
    }
}
var IEVersion = IE()



/*
  取样式
*/
function getStyle(dom,style){
    if(dom.currentStyle){
      return dom.currentStyle[style];
    }else{
      return getComputedStyle(dom,null)[style];
    }
}
/*
 判断是否是window对象
*/
function isWindow(obj){
  return obj!=null && obj == obj.window;
}



/*
  判断传入的参数是否是function类型
*/
function isFunction(fn){
    return type(fn) === 'function';
}



/*
  判断一个对象是否是 {}
*/
function isNullObject(obj){
   if(obj == null){
    return false;
   }
   for(var attr in obj){
    return false;
   }
   return true;
}


/*
  判断一个对象是否是普通的key:value对象并且value不能是function
*/
function isPlainObject(obj){
  if(obj == null){
    return false;
  }
  for(var attr in obj){
    if( obj.hasOwnProperty(attr) && isFunction( obj[attr] ) ){
            return false;
    }
  }
  return true;
}



function getCookie(key){
    var arr,reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return decodeURIComponent(arr[2]);
    }else{
        return null;
    }
}



function setCookie(key,value,days){
    // 设置cookie过期事件,默认是30天
    var expire = new Date();
    days = days || 30;
    expire.setTime(expire.getTime() + (+days)*24*60*60*1000);
    document.cookie = key + "="+ encodeURIComponent(value) + ";expires=" + expire.toGMTString();
};



function deleteCookie(key){
    var expire = new Date();
    expire.setTime(expire.getTime() - 1);
    var cval= getCookie(key);
    if(cval!=null)
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    document.cookie= key + "="+cval+";expires="+exp.toUTCString();
}


/*
  保存用户填入的信息到本地
  支持localStorage的就使用localStorage
  否则使用cookie
  使用场景：
  移动端、pc端皆可使用
  在移动端如果webview不能使用localStorage，即可使用cookie
  在pc端IE7及一下使用cookie，IE8+使用localStorage
*/
function setData(key,data){
    var storage = window.localStorage;
    var cook = document.cookie;
    data = data || {};
    key = key + '';
    // 如果支持 localStorage 就使用，否则使用cookie
    if(storage){
        storage.setItem(key,JSON.stringify(data));
    }else if(cook){
        var setCookie = function(key,value,days){
            // 设置cookie过期事件,默认是5天
            var expire = new Date();
            days = days || 5;
            expire.setTime(expire.getTime() + (+days)*24*60*60*1000);
            document.cookie = key + "="+ encodeURIComponent(value) + ";expires=" + expire.toGMTString();
        };
        setCookie(key,JSON.stringify(data));
    }
}
/*
  获取本地数据
  对应setData
*/
function getData(key){
    var storage = window.localStorage;
    var cook = document.cookie;
    if(storage){
        return JSON.parse(window.localStorage.getItem(key+''));
    }else if(cook){
        var getCookie = function(key){
            var arr,reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return decodeURIComponent(arr[2]);
            }else{
                return null;
            }
        };
        return JSON.parse(getCookie(key));
    }
    return null
}

/*
  给数组添加遍历方法
*/
if(typeof Array.prototype.forEach !== "function"){
    Array.prototype.forEach = function(fn){
      var i = 0,l = this.length;
      while(i<l){
          fn(this[i],i++);
      }
    }
}



/* 
  数组归并方法
*/
if (typeof Array.prototype.reduce !== "function") {
  Array.prototype.reduce = function (callback, initialValue ) {
     var previous = initialValue, k = 0, length = this.length;
     if (typeof initialValue === "undefined") {
        previous = this[0];
        k = 1;
     }
    if (typeof callback === "function") {
      for (k; k < length; k++) {
         this.hasOwnProperty(k) && (previous = callback(previous, this[k], k, this));
      }
    }
    return previous;
  }



/*
 数组indexOf方法
*/
if(typeof Array.prototype.indexOf !== "function"){
  Array.prototype.indexOf = function(item){
    for(var i = 0,l = this.length;i < l && item !== this[i];i++);
    return i === l?-1:i;
  }
}



/*
 数组filter方法
*/
if(typeof Array.prototype.filter !== 'function'){
  Array.prototype.filter = function(fn){
    var result = [],each,
        i = 0,l = this.length;
    while(i<l){
        each = this[i++];
        if(fn(each)){
            result.push(each);
        }
    }
    return result;
  }
}



/*
 字符串startsWith方法
*/
if(typeof String.prototype.startsWith !== 'function'){
    String.prototype.startsWith = function(s){
        return this.indexOf(s) === 0;
    }
}



/*
 字符串endsWith方法
*/
if(typeof String.prototype.endsWith !== 'function'){
    String.prototype.endsWith = function(s){
        return this.indexOf === this.length - 1;
    }
}


/* 
  随机从数组中取出数据 
  data 数组
  len  随机取出的元素的个数
*/
function randArray(data, len) {
  data.sort(function() {
    return Math.random() - 0.5;
  });
  return data.slice(0, len);
}

