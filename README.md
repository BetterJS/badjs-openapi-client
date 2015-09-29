#badjs-openapi-client

> for connect badjs-api

#install
```
 npm install badjs-openapi-client
 ```

#Usage
``` javascript

var openClient = require("badjs-openapi-client");

var openClient = Client({port : 9500 , host : "127.0.0.1" , appkey : "1f3d368d87a767d9134d99cee392b062"} , function (err){
    console.log(err ? "connect fail" : "connect succ ");
})


openClient.on("data", function(data){
    console.log(data);
})


openClient.on("close", function(data){
    console.log("close");
});


setTimeout(function (){
    client.close();
},10000)

```





