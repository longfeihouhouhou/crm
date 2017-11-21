let http=require('http');
let fs=require('fs');
let url=require('url');
let port=1999;
http.createServer(function (req,res) {
    let {pathname,query}=url.parse(req.url,true);


console.log(pathname,'132')
    //1.处理静态文件的请求
    let reg= /\.([a-z]+)/i;
    if(reg.test(pathname)){

        let suffix =reg.exec(pathname)[1].toUpperCase();
       // console.log(suffix,'234');
        let suffixMIME = 'text/plain';
        switch (suffix){
            case "HTML":
                suffixMIME='text/html';
                break;
            case "CSS":
                suffixMIME='text/css';
                break;
            case "JS":
                suffixMIME='text.javascript';
                break;
            // default : suffixMIME='text/html';
        }
        let  conFile ='file is not found';
        let  status = 404;
        try {
            conFile=fs.readFileSync('.'+pathname,'utf-8');
            status = 200;
        }catch (e){
            suffixMIME = 'text/plain'
        }
        res.writeHead(status,{'content-type':suffixMIME+ ';charset=utf-8;'});
        res.end(conFile);
    }
    //2.处理客户端使用ajax进行的数据请求：请按照API接口文档规范(未写)
    let productList = fs.readFileSync('./json/custom.json','utf-8');
    productList =productList.length===0?'[]':productList;
    productList = JSON.parse(productList);
    console.log(productList)
    let result ={code:1,msg:'err',date:null};
    //获取所有商品信息
    if(pathname==='getAllList'){
        if(productList.length>0){
            result={
                code:0,
                msg:'success',
                date:productList
            }
        }
        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result))
    }































    //1.获取轮播图数据
    // let sliders=require('./mock/sliders');


}).listen(port,function () {
    console.log('server is success, listen on '+port+ 'port' );
});


