/*
*
* author:pod
* date:2016.03.04 17:13
*
* qq:455322185 
*/

/*-------------------------------------------------------------------------------------------*/


/*

 函数节流工具函数
 
 主要解决的问题是：
 
   一个函数节流之后，第一次执行是延迟的，很多时候，我们希望第一次执行就马上执行
   然后后面的才进行节流

 
 用法：
 
 1、
  
   // 3个参数，第一个参数为被节流的函数，第二个为被节流的函数的上下文（被节流函数内部的this所指向的对象），第三个为间隔时间
  throttle(handler,this,1000); 
 
 2、
 
  // 2个参数，第一个参数为被节流的函数，第二个为间隔时间。函数上下文使用默认的全局环境（浏览器为window，node为Global）
 throttle(handler,1000); 

3、
 
  // 1个参数，使用配置（option）的方式
  
  throttle({
    method:handler, // 被节流的函数
    context:this, // 被节流的函数的上下文。默认使用全局环境（浏览器为window，node为Global）
    interval:300, // 2次执行的时间间隔，只有大于此数，被节流的函数才会执行下一次
    firstDelay:true // 第一次是否延迟执行。默认是false
 });
 
 注意：
 
   对于多次触发了事件，只想最后执行一次回调的场景，例如 window.onresize 
   
   请使用第3种用法，且设firstDelay为true。

*/

/*-------------------------------------------------------------------------------------------*/

function throttle(method,context,interval){
            // 参数的长度
            var argLen = arguments.length; 
            // 第一次是否延迟（true:延迟ms毫秒再执行，false:马上执行），默认值false
            var firstDelay = false, 
                // 参数数组中的第一个元素
                arg,
                // 本函数（throttle）执行的次数
                count,
                startTime,
                endTime;

            //开始组装参数
            if(argLen === 0 || argLen > 3){
                return;
            }else if(argLen === 1){
                arg = arguments[0];
                method = arg.method;
                context = arg.context || this;
                interval = arg.interval;
                if(typeof firstDelay === "boolean"){
                    firstDelay = arg.firstDelay;
                }
            }else if(argLen === 2){
                interval = context;
                context = this;
            }
            // 参数组装完毕

            if(firstDelay){
                // 如果第一次需要延迟的话，就不记录次数了，每次都延迟即可
                clearTimeout(context.__throttle_timer__);
                context.__throttle_timer__ = setTimeout(function(){
                    method.call(context);
                },interval);
            }else{
                // 如果第一次不需要延迟的话
                // 取出回调执行的次数
                count = context.__throttle_count__;
                // 如果count为undefined或0，说明回调一次也没有执行过
                if(!count){
                    // 初始化 __throttle_count__ 初始值为0
                    count = context.__throttle_count__ = 0;
                    // 记录第一次执行回调的开始时间
                    context.startTime = +new Date();
                    // 马上执行回调
                    method.call(context);
                }
                // 如果count的次数大于或等于1的话，说明至少是第二次执行了
                if(count >= 1){
                    // 取出上一次执行的时间点
                    startTime = context.startTime;
                    // 记录本次执行的时间点
                    endTime = +new Date();
                    // 把本次执行的时间点记录到startEnd，为下一次执行时所用
                    context.startTime = endTime;
                    // 间隔时间大于指定的时间，才执行回调
                    if(endTime - startTime > interval){
                        method.call(context);
                    }
                }
                // 执行次数加1
                context.__throttle_count__++;

            }

        }    
