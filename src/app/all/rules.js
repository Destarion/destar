"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/operator");
var Rules = (function () {
    function Rules(_http) {
        this._http = _http;
        this.rule = "dummy text";
    }
    ;
    Rules.prototype.ngOnInit = function () {
        var _this = this;
        console.log("This is the rule: " + this.rule);
        console.log('starting ngOnInit');
        var headers = new http_1.Headers();
        var subName = JSON.stringify({ subName: 'all' });
        headers.append('Content-Type', 'application/json');
        this._http.post('/getRules', subName, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log("second data: " + data.data); _this.rule = data.data; console.log(data.data); }, function (err) { return console.log(err); }, function () { return console.log('success'); });
    };
    ;
    Rules.prototype.changeRules = function (text) {
        var text = text.value;
        var subName = 'all';
        var send = JSON.stringify({ text: text, subName: subName });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/changeRules', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Changing of the rules is complete'); });
    };
    Rules = __decorate([
        core_1.Component({
            selector: "rules",
            template: "<div class=\"container\">\n<div class=\"form\">\n    <form role=\"form\">\n    <textarea name='text' #newtext></textarea>\n        <button class=\"btn btn-primary\" (click)=\"changeRules(newtext)\">submit</button>\n    </form>\n    </div>\n</div>\n    <div class=\"container\">\n    {{ rule }}\n    </div>"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], Rules);
    return Rules;
}());
exports.Rules = Rules;
//# sourceMappingURL=rules.js.map