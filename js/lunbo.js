
var lunbo=(function(){
    var _box=document.querySelector('.box');
    var _showbox=document.querySelector(".show");
    var _tag=document.querySelector('.tag');
    var _showtags=document.querySelectorAll('li');
    var _left=document.querySelector('.btn1');
    var _right=document.querySelector('.btn2');
    return {
        init:function(){
            var _this=this;
            this.index=0;
            this.event();
            this.autoPlay();
            for(var i=0;i<_showtags.length;i++){
                    _showtags[i].index=i;
            }
            var first=_showbox.firstElementChild;
            var last=_showbox.lastElementChild.cloneNode(true);
            _showbox.appendChild(first.cloneNode(true));
            _showbox.insertBefore(last,first);
            _showbox.style.left='-600px';
        },
        event:function(){
            var _this=this;
            _box.onmouseenter=function(){
                _left.style.display='block';
                _right.style.display='block';
                _this.stop();
            };
            _box.onmouseleave=function(){
                _left.style.display='none';
                _right.style.display='none';
                _this.autoPlay();
            };
            _tag.onmousedown=function(e){
                e=e||window.event;
                var target=e.target||e.srcElement;
                if(target.nodeName=='LI'){
                    console.log(target.index);
                    _this.showImage(target.index);
                }
            };
            _left.onmouseenter=function(){
               _left.setAttribute('src','images/left2.png');
            };
            _right.onmouseenter=function(){
                _right.setAttribute('src','images/right2.png');
            };
            _left.onmouseleave=function(){
                _left.setAttribute('src','images/left1.png');
            };
            _right.onmouseleave=function(){
                _right.setAttribute('src','images/right1.png');
            };
            _left.onmousedown=function(){
                _this.index--;
                _this.showImage(_this.index);
            };
            _right.onmousedown=function(){
                _this.index++;
                _this.showImage(_this.index);
            };

        },
        showImage:function(index){
            if(index>_showtags.length-1){
                index=0;
                _showbox.style.left=0;
            }
            else if(index<0){//不能等于0，否则点击1时会显示最后一张
                index=_showtags.length-1;
                _showbox.style.left=-(_showtags.length+1)*600+'px';
            }
            this.index=index;
            for(var i=0;i<_showtags.length;i++){
                _showtags[i].className='';
            }
            this.moved(_showbox,'left',-(this.index+1)*600,500);
            _showtags[this.index].className='checked';
        },
        autoPlay:function(){
            var _this=this;
            clearInterval(_box.timer);
            _box.timer=setInterval(function(){
                _this.index++;
                _this.showImage(_this.index);
            },1000);
        },
        stop:function(){
            var _this=this;
            clearInterval(_box.timer);
        },
        getStyle:function(ele,attr){
            if(window.getComputedStyle){
                return window.getComputedStyle(ele,null)[attr];
            }
            return ele.currentStyle[attr];
        },
        moved:function(ele,attr,target,time){
            var _this=this;
            var timer=null;
            if(typeof ele=='string'){
                ele=document.querySelector(ele);
            }
            var init=parseInt(this.getStyle(ele,attr));
            var speed=(target-init)/(time/10);
            clearInterval(timer);
            timer=setInterval(function(){
                var init=parseInt(_this.getStyle(ele,attr));
                init+=speed;
                if(speed>0&&init>=target||speed<0&&init<=target){
                    init=target;
                    clearInterval(timer);
                }
                ele.style[attr]=init+'px';
            },10);
        }
    }
}());