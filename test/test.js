/**
 * Created by chriscai on 2015/9/29.
 */

var Client = require("../app");

var client = Client({port : 9500 , host : "127.0.0.1" , appkey : "1f3d368d87a767d9134d99cee392b062"} , function (err){
    console.log(err ? "connect fail" : "connect succ ");
})


client.on("data", function(data){
    console.log(data);
})


client.on("close", close = function(data){
    console.log("close");
})


//client.off("close" , close)

setTimeout(function (){
    client.close();
},10000)





