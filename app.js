var net = require('net');
var Events = require("events");


/**
 * @param setting
 * @constructor
 */
var OpenApiClient = function (options, callback) {
    options || (options = {});
    callback || (callback = function () {
    });

    var self = this;


    if (!options.appkey) {
        throw "appkey is required ";
    }

    this._events = new Events();

    self._client = net.connect({port: options.port || 9500, host: options.host || "127.0.0.1"}, function (err) {
        if (err) {
            callback(err)
        }
        self._client.write(JSON.stringify({type: "auth", appkey: options.appkey || ""}));
    });


    this._timeoutId = setInterval(function () {
        !self._closeflag && self._client.write(JSON.stringify({type: "keepalive"}))
    }, 5000);


    self._client.on("data", function (data) {
        var json = {} , dataStr = "";
        try {
            dataStr  = data.toString();
            json = JSON.parse(dataStr);
        } catch (e) {
            callback(e);
            return;
        }

        switch (json.type) {
            case "auth" :
                if (json.err < 0) {
                    callback(json);
                } else {
                    callback();
                }

                break;
            default :
                self._events.emit("data" , dataStr);
                break;
        }

    });

    self._client.on("close", function () {
        clearInterval(self._timeoutId);
        self._events.emit("close");
    })

}

OpenApiClient.prototype = {

    on: function () {
        this._events.addListener.apply(this._events, arguments);
    },

    off: function () {
        this._events.removeListener.apply(this._events, arguments);
    },

    close: function () {
        // destroy 异步触发close 时间， 存在可能 interval 先运行，造成 write 时候出错
        this._closeflag = true;
        this._client.destroy();
    }

}


module.exports = function (options, callback) {
    return new OpenApiClient(options, callback);
}



