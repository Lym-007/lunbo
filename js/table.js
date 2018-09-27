var tableload=(function(){
    var _del=document.querySelector('.btn1');
    var _cal=document.querySelector('.btn2');
    var _cover=document.querySelector(".cover");
    var _conf=document.querySelector(".confirm");
    var _head=document.querySelector('h3');
    return {
        init:function(ele,arr){
            this.ele=ele;
            this.insertxt(this.ele,arr);
            this.event(this.ele);
        },
        event:function(ele){
            var _this=this;
            if(typeof ele =='string'){
                ele=document.querySelector(ele);
            }
            ele.onmousedown=function(e){
                e=e||window.event;
                var target=e.target||e.srcElement;
                if(target.nodeName=="BUTTON"){
                    console.log(1);
                    _cover.style.display='block';
                    var _tr=target.parentNode.parentNode;
                    console.log(_tr);
                    _del.onmousedown=function(){
                        _this.remove(ele,_tr);
                        _cover.style.display='none';
                    };
                    _cal.onmousedown=function(){
                        _cover.style.display='none';
                    };
                    _head.onmousedown=function(e){
                        e=e||window.event;
                        var _x=e.offsetX;
                        var _y=e.offsetY;
                        var maxX=_cover.clientWidth-_conf.offsetWidth+_conf.offsetWidth/2;
                        var maxY=_cover.clientHeight-_conf.offsetHeight+_conf.offsetHeight/2;
                        document.onmousemove=function(e){
                            e=e||window.event;
                            //阻止浏览器默认行为
                            _this.stopd(e);
                            var x=e.clientX-_x+_conf.offsetWidth/2;
                            var y=e.clientY-_y+_conf.offsetHeight/2;
                            if(x<_conf.offsetWidth/2){
                                x=_conf.offsetWidth/2;
                            }else if(x>=maxX){
                                x=maxX;
                            }
        
                            if(y<_conf.offsetHeight/2){
                                y=_conf.offsetHeight/2;
                            }else if(y>=maxY){
                                y=maxY;
                            }
                            _conf.style.left=x+'px';
                            _conf.style.top=y+'px';
                        }
                    }
                    _head.onmouseleave=function(){
                        document.onmousemove=null;
                    }
                    document.onmouseup=function(){
                        document.onmousemove=null;
                    }
                }
            }
        },
        stopd:function(e){
            if(e.preventDefault){
                e.preventDefault();
            }
            else{
                e.returnValue=false;
            }
        },
        insertxt:function(ele,arr){
            if(typeof ele=='string'){
                ele=document.querySelector(ele);
            }
            for(var j=0;j<arr.length;j++){
                var tr=document.createElement('tr');
                for(var i in arr[j]){
                    var td=document.createElement('td');
                    td.innerHTML=arr[j][i];
                    tr.appendChild(td);
                }
                td=document.createElement('td');
                var btn=document.createElement('button');
                btn.innerHTML='删除';
                btn.className='del';
                td.appendChild(btn);
                tr.appendChild(td);
                ele.appendChild(tr);
            }
        },
        remove:function(ele,data){
            ele.removeChild(data);
        }
    }
}());