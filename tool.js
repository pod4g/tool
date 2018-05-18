
const u = navigator.userAgent
export default {
  version: {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: u.match(/\sQQ/i) === ' qq', // 是否QQ
    iPhoneX: (function () {
      const iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      const ratio = window.devicePixelRatio || 1
      const screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
      }
      let result = false
      if (iOS && screen.width === 1125 && screen.height === 2436) {
        result = true
      }
      return result
    })()
  },
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  userAgent: u
}


/*
  实现[ba, bb]之间的随机数
*/
function random (ba, bb) {
            const NUMBER_TYPE = '[object Number]'
            if (
                !ba || 
                !bb ||
                Object.prototype.toString.call(ba) !==  NUMBER_TYPE|| 
                Object.prototype.toString.call(bb) !== NUMBER_TYPE 
            ) return
            ba = Number(ba)
            bb = Number(bb)
            // 如果两者相等，那么每次随机都是这个数
            if (ba === bb) return ba
            // 交换位置
            if (ba > bb) [ba, bb] = [bb, ba]
            return Math.floor(Math.random() * (bb - ba + 1) + ba)
        }

 /**
     * 
     * 2018-01-25去阿里面试了，其中有道阿里面试题。。
     * 给一个图片url数组，一个图片下载完毕，在下载另外一个
     */
    function loadImageByOrder () {
        let done = false
        let allDone = false
        console.log('loadImageByOrder...')
        return function (arr, callback) {
            console.log('闭包函数...', arr)
            if (!arr || !Array.isArray(arr) || !arr.length) return
            // 过滤出空的或者是null、undefined的值
            arr = arr.filter(url => !!url)
            console.log('闭包函数处理后的arr...', arr)
            function download (url) {
                if (!url) {
                    allDone = true
                    return
                }
                done = false
                console.log('开始下载' + url)
                const image = new Image()
                image.src = url
                image.onload = image.error = () => {
                    done = true
                    console.log('下载成功' + url)
                    callback.call(image, url)
                }
            }
            download(arr.shift())
            const interval = 17
            const timer = 
            setTimeout (function checker () {
                setTimeout(checker, interval)
                if (!done) return
                if (allDone) {
                    clearTimeout(timer)
                    return
                }
                download(arr.shift())
            }, interval)
        }
    }

/**
 * 一个节点如果放到文档碎片中，那么就会从页面删除
 * 把节点转成文档碎片并从文档中移出 vue用到了这个方法
*/
function node2Fragment(node, vm) {
   //这里是dom劫持，vue会新建一个文档片段来替换dom中本来的结点
   var flag = document.createDocumentFragment();
   //子节点
   var child;
   while (child = node.firstChild) {
     console.log('child:', child)
     //开始编译每个结点
     // compile(child,vm);
     //appendchild方法会自动删除node对象的child结点
     flag.appendChild(child)
   }
   return flag;
}

/*
 获取文件扩展名
 'filename'	''
 'filename.txt'	'txt'
 '.hiddenfile'	''
 'filename.with.many.dots.ext'	'ext'
*/
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}
 

/*
      解析传进来的带标签的字符串，返回去掉标签之后的纯文本
  */
  function extractText(summary) {
    if (!summary) {
      return '';
    }
    // 如果传进来的本身就是纯本文，原样返回
    if (!summary.startsWith('<') && !summary.endsWith('>')) {
      return summary;
    } else {
      return summary.replace(/</g, "\n<")
        .replace(/>/g, ">\n")
        .replace(/\n\n/g, "\n")
        .replace(/^\n/g, "")
        .replace(/\n$/g, "")
        .split("\n").filter(function(item) {
          return !item.startsWith('<');
        }).join('').replace(/&nbsp;?|<br\s*\/*>|\s*/ig, '');
    }
  }
  
/*

 trigger any event of ele by the specified EventName
 
 for instance 
 
 we can't trigger mouseover event like click by click()
 
 fireEvent(btn, 'mouseover');
 
 这是微软IE浏览器用以替代EventTarget.dispatchEvent()的私有方法，
 与EventTarget.dispatchEvent()不同的是通过fireEvent() 触发的事件不会触发事件的默认行为，
 例如，通过fireEvent()触发<input type="checkbox">的点击事件并不会切换checkbox的选中状态
 
 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/fireEvent
*/

function fireEvent( ele, EventName ) {
    if( ele != null ) {   
        if( ele.fireEvent ) {
            ele.fireEvent( 'on' + EventName );     
        } else {   
            var evObj = document.createEvent( 'Events' );
            evObj.initEvent( EventName, true, false );
            ele.dispatchEvent( evObj );
        }
    }
}


/*

 特定元素的事件由其父元素代理

 当点击特定元素或特定元素的子元素时，执行相应的逻辑

*/

var isDelegate = function(e, selector){
        var 
            ArrayClass = Array,
            elements,
            element,
            i = 0,
            target = e.target,
            currentTarget = e.currentTarget,
            makeArray = function(ele){
                return typeof ArrayClass.from === 'function'? ArrayClass.from(ele):ArrayClass.prototype.slice.call(ele);
            };
        if(
            typeof selector === 'string' // selector
         ){
            elements = makeArray(currentTarget.querySelectorAll(selector));
        }else if(
            selector && selector.nodeType // element
        ){
            elements = [ selector ];
        }
        else // dom数组/NodeList/HTMLCollection
        {
            elements = makeArray(selector);
        }

        while(element = elements[i++]){
            if(element === target || element.contains(target)){
                return true;
            }
        }
        return false;
}

/*
使ele元素滚动到视口的垂直center
*/

function toViewportCenter(ele, offset){
   if(isElement(ele)){
     var OT = getOffsettopFromPageTop(ele); // 距离页面顶部的距离
     var VH = document.documentElement.clientHeight; // viewport高度
     var CH = ele.clientHeight; // 元素高度
     var T = ( VH - CH ) / 2;
     to( OT - T, offset );
   }
}


/*

 获取页面中某个元素距离页面顶部的距离
 HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。
 如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素（标准模式下为 html；quirks 模式下为 body）。
 当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。


 https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetParent
*/

function getOffsettopFromPageTop(obj) {
    var h = 0;
    while (obj) {
      h += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return h;
}

/*
页面滚动到指定位置
*/
function to(top, offset){
  document.body.scrollTop = document.documentElement.scrollTop = top + (offset || 0);
}





// 判断一个元素是否在可视区（视口）内部
function inViewport(element, offset){
    if(!isElement(element)) return false;
    var rect = element.getBoundingClientRect(),
          left = rect.left,
          top = rect.top,
          right = rect.right,
          bottom = rect.bottom;
      offset = offset || 0;
      return bottom > offset
          && right > offset
          && window.innerWidth - left > offset
          && window.innerHeight - top > offset;
  }




/*

 获取broken的图片
   注意必须写在load回调中，不然的话
   在网速慢 + 图片大的情况下，会导致某些大图也计入broken
   
*/

window.addEventListener('load', function(){
	
      var imgs = getByTag('img'), brokens = [], i = 0, img;
      
      while( img = imgs[i++] ){
      	// 在网速慢，图片大时，大图片未加载出来时
      	// 其 img.naturalWidth === 0 && img.naturalHeight === 0 
        if( !img.complete || ( img.naturalWidth === 0 && img.naturalHeight === 0 ) ){
          brokens.push(img);
        }
      }
	
      console.log('加载错误的图片有：', brokens);
	
}, false);


/*

   复制到剪切板
   
   完美支持的浏览器：      Edge/Chrome/Opera/Firefox
   
   支持但用户体验不太好：  IE6/7/8/9/10/11/   会弹窗询问用户是否允许网页访问系统剪切板
   
   由于安全性的原因，safari不支持，可以在error回调中作出相应的处理（例如选中文本，让用户直接复制，而不用先长按选中再复制）

*/

function copyTextToClipboard(text,success,error){
        success = success || function(){};
        error = error || function(){};
        // 如果是IE，就使用IE专有方式进行拷贝
        if(window.clipboardData){
            var successful = window.clipboardData.setData('Text',text);
            if(successful) {
                success();
            } else {
                error();
            }
        }else{
            var textArea = document.createElement('textarea');
            var styleArr = [ 'position:','fixed;',
                             'top:','0;',
                             'left:','0;',
                             'padding:','0;',
                             'width:','1px;',
                             'height:','1px;',
                             'border:','none;',
                             'outline:','none;',
                             'boxShadow:','none;',
                             'background:','transparent',
                           ]
            textArea.style.cssText = styleArr.join('');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try{
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copying text command was ' + msg);
                if(successful) {
                    success();
                } else {
                    error();
                }
            }catch(e){
                console.log('Oops, unable to copy');
                error();
            }
            document.body.removeChild(textArea);
        }
    }


/*
  
  一个继承的实现
  
*/

var extend = function(child, parent) {
    
    var hasProp = {}.hasOwnProperty;

    // 首先呢，先把parent对象上的自有属性挨个儿添加到child对象上
    for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
    }

    // 定义一个构造器
    function ctor() {
        // 往由这个构造器生成的对象上添加一个 constructor 属性，值是child对象
        this.constructor = child;
    }
    // 使构造器的prototype指向parent的prototype。
    // 这样通过构造器生成的对象就能共享 parent.prototype 上的属性了
    ctor.prototype = parent.prototype;
    // 
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}


/*

  数组降维

*/

function flatten(arr,ret){
    ret = ret || [];
    if( arr == null || arr.length === 0 ) return ret;
    var i = 0,length = arr.length,item;
    // var toString = Object.prototype.toString;
    while( i < length ){
        item = arr[i++];
        // if(toString.call(item) === '[object Array]'){
        if(item instanceof Array){ // 这样判断会更好
            flatten(item,ret);
        }else{
            ret.push(item);
        }
    }
    return ret;
}


/*

 设置input光标的位置

*/

function setCursorPosition(elem, index) {
    var val = elem.value
    var len = val.length
 
    // 超过文本长度直接返回
    if (len < index) return
    setTimeout(function() {
        elem.focus()
        if (elem.setSelectionRange) { // 标准浏览器
            elem.setSelectionRange(index, index)   
        } else { // IE9-
            var range = elem.createTextRange()
            range.moveStart("character", -len)
            range.moveEnd("character", -len)
            range.moveStart("character", index)
            range.moveEnd("character", 0)
            range.select()
        }
    })
}



/*

 判断一个字符串是不是回文

*/

function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase(); 
  return (str == str.split('').reverse().join(''));
}

/*
 
   js中浮点数精确计算
   例如 0.1 + 0.2 = 0.30000000000000004就是有误差所致

*/

function add(num1, num2){
 var r1, r2, m;
 if(Number.isInteger(num1) || Number.isInteger(num2)){
 	return num1 + num2;
 }
 r1 = (''+num1).split('.')[1].length;
 r2 = (''+num2).split('.')[1].length;
 
 m = Math.pow(10,Math.max(r1,r2));
 return (num1 * m + num2 * m) / m;
}

console.log(add(0.1,0.2)); //0.3
console.log(add(0.15,0.2256)); //0.3756


/*
 判断一个数是否是整数
*/

Number.isInteger = Number.isInteger || function(num){
   return parseInt(x, 10) === x; 
}
  
  
  
  function getTag(a) {
    var ret = {
        type: a.nodeName
    }
    if (ret.type.charAt(0) !== "#") {
        ret.children = []
    }
    for (var i = 0, el; el = a.childNodes[i++]; ) {
        ret.children.push(getTag(el))
    }

    return ret
}
console.log(getTag(document.body))


/*

  使用js来生成UUID

*/

function generateID(prefix) {
    prefix = prefix || "prefix"
    // Math.random() + Math.random() => [0,2)
    return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix)
}

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

 第二个判断类型的函数，那个好一点儿？

*/

function type(arg){
	
	// undefined number boolean string function object
	
	var t = typeof arg,s;
	
	// null and undefined return "null" and "undefined"
	if(arg == undefined){
		return arg + '';
	}
	
	if(t === 'object'){
		
		s = Object.prototype.toString.call(arg);
		
		return s.slice(8,-1).toLowerCase();
		
	}else{
	    // number boolean string function
	    return t;
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

