function ajax(options){
    var _default={
        url:null,
        type:"GET",
        dataType:"TXT",
        async:true,
        data:null,
        success:null,
        error:null
    };
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key]=options[key];
        }
    }
    var xhr=new XMLHttpRequest();
    //deal with the ajax request
    if(_default.type.toUpperCase()==="GET"){
        _default.url+= _default.url.indexOf("?")===-1?"?":"&";
        _default.url+="_="+Math.random();
    }
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange=function(){
        if(/^(2|3)\d{2}$/.test(xhr.status)){
            if(xhr.readyState===4){
                var val=xhr.responseText;
                _default.dataType=_default.dataType.toUpperCase();
                switch (_default.dataType){
                    case "TXT":
                        val=xhr.responseXML;
                        break;
                    case "JSON":
                        val="JSON" in window?JSON.parse(val):eval("("+val+")");
                        break;
                }
                _default.success&&_default.success.call(xhr,val);
            }
        }
        if(/^(4|5)\d{2}$/.test(xhr.status)){
            _default.error&&_default.error.call(xhr,xhr.responseText);
        }
    };
    xhr.send(_default.data);
}