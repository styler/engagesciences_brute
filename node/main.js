"use strict";
var got = require("got");
var faker = require("faker");

/* Config */
var cID = "";
var apikey = "";


var fakeProxy = [];
var _loop_1 = function (i) {
    fakeProxy[i] = faker.internet.ip();
    setTimeout(function () {
        got("https://submit.engagesciences.com/metric/record/1001.json?cID=" +cID+ "&apikey=" +apikey, {
            json: true,
            headers: {
                "X-Forwarded-For": fakeProxy[i]
            }
        }).then(function (res) {
            console.log("Response: " + res.body.recorded + " => " + fakeProxy[i]);
            if (!res.body.recorded) {
                console.log(res.body.message);
            }
        }).catch(function (err) {
            console.log("Timed out =>" + fakeProxy[i]);
        });
    }, 100 * (i + 1));
};
for (var i = 0; i < 9999; i++) {
    _loop_1(i);
}
console.log("Send all requests.\n");
