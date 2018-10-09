const NS_PER_SEC = 1e9;
var service_token = process.env.SERVICE_TOKEN;
var service_id = process.env.SERVICE_ID;
var express = require('express');
var router = express.Router();

var Client = require('3scale').Client;
client = new Client();
child_process = require('child_process');


function report_usage(req) {
    var user_key = req.query.user_key;
    client.authrep_with_user_key({
        service_token: service_token,
        service_id: service_id,
        user_key: user_key, usage: {"hits": 1}
    }, function (response) {
        if (response.is_success()) {
        } else {
            throw new Error("not authorized " + response.error_message);
        }
    });
    client.authrep_with_user_key({
        service_token: service_token,
        service_id: service_id,
        user_key: user_key, usage: {"cpu": cpu}
    }, function (response) {
        if (response.is_success()) {
        } else {
            throw new Error("not authorized " + response.error_message);
        }
    });
}

router.get('/', function (req, res, next) {
    const time = process.hrtime();
    var fortune = child_process.execSync('fortune');
    const diff = process.hrtime(time);

    cpu = Math.ceil((diff[0] * NS_PER_SEC + diff[1]) / 1000000);
    report_usage(req);
    res.send(fortune.toString() + '\n');
});

module.exports = router;
