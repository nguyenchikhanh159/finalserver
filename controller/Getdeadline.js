
var request = require('request');
var cheerio = require('cheerio');
var request = require('request');


var RequestData = async (username, password, cookie) => {
    return new Promise((resolve, reject) => {
        let MoodleSS= 'MoodleSession=';
        let setcookie= MoodleSS+ cookie._jar.cookies[0].value;
        request({
            method:"GET",
            url: "https://courses.uit.edu.vn/calendar/view.php?view=upcoming",
            headers: {
                'Cookie':setcookie
              }
        }, (err, res, body) => {
            if (err)
                throw (err);
            var $ = cheerio.load(body);
            var list = [];
            $('div[class="row"]').find('a').each(function (index, element) {
                list.push($(element).text());
            });
            $('div[class="row mt-1"]').find('a').each(function (index, element) {
                list.push($(element).text());
            });
            $('div[class="d-inline-block"]').find('h3').each(function (index, element) {
                list.push($(element).text());
            });
            $('div[class="row mt-1"]').find('p').each(function (index, element) {
                // list3.push($(element).text());
            });
            if (list != undefined) {
                resolve(list);
            }
            else {
                reject(err);
            }
        });
    });
}
exports.GetDeadline = async (req, res, next) => {
    const { data } = req.body;
    let result = await RequestData(data.username, data.password, data.jar)
    res.json(result);
    console.log(result);
}