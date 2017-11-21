~function(pro){
    function queryURLParameter(){
        var reg=/([^?=#]+)=([^?=#]+)/g;
        var obj={};
        this.replace(reg,function(){
            console.log(arguments[2]);
           obj[arguments[1]]=arguments[2];
        });
        return obj;
    }
    pro.queryURLParameter=queryURLParameter;
}(String.prototype);

var detailRender=(function(){
    //->获取提交按钮
     var submit=document.getElementById("submit");
    //->获取文本框中的内容
     var userName=document.getElementById("userName"),
         userAge=document.getElementById("userAge"),
         userPhone=document.getElementById("userPhone"),
         userAddress=document.getElementById("userAddress");
    //->两个特殊变量，一个将来接收由修改也
    var customId=null,isUpdate=false;
    function bindEvent(){
        submit.onclick=function(){
            if(isUpdate){
                var data={
                    id:customId,
                    name:userName.value,
                    age:userAge.value,
                    phone:userPhone.value,
                    address:userAddress.value
                };

                ajax({
                    url:"/updateInfo",
                    type:"POST",
                    dataType:"JSON",
                    data:json.stringify(data),
                    success:function(res){
                        if(res&&res.code==0){
                            window.location.href="css3选择器.html";
                        }
                    }
                });
                return;
            }
            var data={
                name:userName.value,
                age:userAge.value,
                phone:userPhone.value,
                address:userAddress.value
            };
            ajax({
                url:"/addInfo",
                type:"POST",
                dataType:"JSON",
                data:json.stringify(data),
                success:function(res){
                    if(res&&res.code===0){
                        window.location.href="index.html";
                    }
                }
            })
        }
    }


    return {
        init:function(){
            var obj=window.location.href.queryURLParameter();
            if(typeof obj.id!="undefined"){
                /*var*/ customId=obj.id;
                isUpdate=true;
                ajax({
                    url:"/getInfo?id="+customId,
                    type:"GET",
                    dataType:"JSON",
                    success:function(res){
                        if(res&&res.code===0){
                            var info=res.info;
                            userName.value=info.name;
                            userAge.value=info.age;
                            userPhone.value=info.phone;
                            userAddress.value=info.address;
                        }
                    }
                });
            }
            bindEvent();
        }
    }
})();
detailRender.init();
