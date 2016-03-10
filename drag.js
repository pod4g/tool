 /*
 *
 * author:pod
 * QQ:455322185
 * date:2016.03.10
 * 使用方法：把需要进行拖拽的元素传入构造函数即可
 * 例如
 *   var dragedDOM = document.getElementById('drag');
 *   var drag = new Drag(gragedDOM);
 *
 */
 
 ;(function(w,doc,undefined){
    var Drag = function(obj){
        this.obj = obj;
        this.main();
    }
    Drag.prototype = {
        constructor:Drag,
        addStyle:function(){
            this.obj.style.cssText = "position:absolute;left:"+this.obj.offsetLeft + "px;top:" + this.obj.offsetTop + "px;";
        },
        bindEvent:function(){
            var self = this.obj;
            self.onmousedown = function(e){
                 e = e || event;
                 var posX = e.clientX - this.offsetLeft;
                 var posY = e.clientY - this.offsetTop;
                doc.onmousemove = function(e){
                    e = e || event;
                    self.style.left = e.clientX - posX + "px";
                    self.style.top = e.clientY - posY + "px";
                }
            }
            self.onmouseup = function(){
                  doc.onmousemove = null;
            };
        },
        main:function(){
            this.addStyle();
            this.bindEvent();
        }
    }
    w.Drag = Drag;
 })(window,document);
