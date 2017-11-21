 ~function(){
    //->获取包裹数据的盒子ul备用
    var customList=document.getElementById("customList");
    //->无论后面做什么，打开也面也需要先展示数据，所以先发送ajax请求拿回数据；
    ajax({
        url:"/getAllList",
        type:"GET",
        dataType:"json",
        success:function(result){
          //result就是我们需要的数据API中编了数据格式的样子，接下来就是按照获取的数据实现HTML的绑定
            if(result&&result.code===0){
                var data=result.data;
                //->绑定数据
                bindHTML(data);
                //->绑定删除的方法
                bindDelete();
            }
        }
    });
    //->编写绑定数据的方法，注意绑定数据中应该注意的事项，给删除按钮自定义属性记录id，给修改按钮的href赋值，同时拼接id备用
    function bindHTML(data){
        var str="";
        for(var i= 0,len=data.length;i<len;i++){
            var cur=data[i];
            console.log(cur.id);
            str+="<li>";
            str+="<span class='w50'>"+cur.id+"</span>";
            str+="<span class='w150'>"+cur.name+"</span>";
            str+="<span class='w50'>"+cur.age+"</span>";
            str+="<span class='w200'>"+cur.phone+"</span>";
            str+="<span class='w200'>"+cur.address+"</span>";
            str+="<span class='w150 control'>";
            str+="<a href='detail.html?id="+cur.id+"'>修改</a>";
            str+="<a href='javascript:;' dataId='"+cur.id+"'>删除</a>";
            str+="</span>";
            str+="</li>";
        }
        customList.innerHTML=str;
    }
    //->绑定点击事件，实现删除功能
    function bindDelete(){
        customList.onclick=function(e){
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            var tarTag=tar.tagName.toUpperCase();
            var customId=tar.getAttribute("dataId");
            if(tarTag==="A"&&tar.innerHTML==="删除"){

                var flag=window.confirm("Are you sure delete?");
                if(flag){
                    ajax({
                        url:"/removeInfo?id="+customId,
                        type:"GET",
                        dataType:"JSON",
                        success:function(res){
                            if(res&&res.code===0){
                                customList.removeChild(tar.parentNode.parentNode);
                            }
                        }
                    })
                }
            }
        }
    }
}();