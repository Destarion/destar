"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/operator");
var newUser = (function () {
    function newUser(_http) {
        this._http = _http;
        this.userName = 'raphael.baudeu@gmail.com';
        this.subName = "all";
    }
    newUser.prototype.onSubmit = function (text) {
        console.log('text : ' + text);
        console.log('The value of the text is : ' + text.value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ text: text.value, userName: this.userName, subName: this.subName });
        this._http.post('/userDemand', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Finished on server and client side'); });
    };
    newUser = __decorate([
        core_1.Component({
            selector: 'new-user',
            template: "\n<div class=\"container\">\n<div class=\"form\">\n<form role=\"form\">\n<h3 class=\"header\">Write the application letter here</h3>\n    <label>Content<textarea class=\"form-control\" #newtext></textarea></label>\n<button class=\"btn btn-primary btn-sm\" (click)=\"onSubmit(newtext)\">click</button>\n</form>\n</div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], newUser);
    return newUser;
}());
exports.newUser = newUser;
//# sourceMappingURL=newUser.js.map