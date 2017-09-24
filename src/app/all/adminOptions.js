"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
require("rxjs/operator");
var adminOptions = (function () {
    function adminOptions(_http) {
        this._http = _http;
        this.subPage = "all";
        //This is to be changed by a check from the server soon
        this.memberRequest = true;
        this.questionVisitors = true;
    }
    adminOptions.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var send = JSON.stringify({ subName: this.subPage });
        this._http.post("adminOptionsInit", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            _this.memberRequest = data.memberRequest;
            _this.questionVisitors = data.questionVisitors;
        }, function (err) { return console.log(err); }, function () { return console.log("The function adminOptionsInit is finished both on the client and server side"); });
    };
    adminOptions.prototype.onApply = function (yes, no, questionYes, questionNo) {
        console.log("yes:");
        console.log(yes.checked, no.checked, questionYes.checked, questionNo.checked);
        console.log('the yes and the no values: ' + yes, no.value, questionYes.value, questionNo.value);
        var yesValue = yes.checked;
        var noValue = no.checked;
        if (yes.checked == true) {
            console.log("The user has chosen to have an apply-based model.");
            this.memberRequest = true;
        }
        else if (no.checked == true) {
            console.log("The user has chosen to have a non-apply-based model.");
            this.memberRequest = false;
        }
        if (questionYes.checked == true) {
            console.log("The question is for all");
            this.questionVisitors = true;
        }
        else if (questionNo.checked == true) {
            console.log("Questions only for members");
            this.questionVisitors = false;
        }
        var send = JSON.stringify({ subPage: "all", memberRequest: this.memberRequest, questionVisitors: this.questionVisitors });
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        this._http.post("subpageOptionsChanged", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("subpageOptionsChanged finished both on the client and server side"); });
    };
    adminOptions = __decorate([
        core_1.Component({
            selector: "admin-Options",
            directives: [common_1.NgIf, common_1.NgFor],
            template: "\n<div>\n<input type=\"text\" #texttest>\n</div>\n<div class=\"container\">\n<div>\n<label>Users need to apply for membership?</label>\n<div class=\"radio\">\n<label>Yes, Moderators and Admins need to accept a request<input type=\"radio\" name=\"opt\" class=\"radio-choice\" #membershipYes></label>\n    </div>\n    <div class=\"radio\">\n<label>No, membership is accessible without applying<input type=\"radio\" #membershipNo class=\"radio-choice\" name=\"opt\"></label>\n        </div>\n    <div>\n    <label>Who can do what action?</label>\n    <div class=\"radio\">\n    <label>Only members can ask questions<input name=\"opt2\" type=\"radio\" class=\"radio-choice\" #questionMemberOnly></label>\n            </div>\n        <div class=\"radio\">\n    <label>Visitors of the subPage can also ask questions<input name=\"opt2\" type=\"radio\" class=\"radio-choice\" #questionVisitorsToo></label>\n            </div>\n    </div>\n    <button class=\"btn btn-primary\" (click)=\"onApply(membershipYes,membershipNo,questionVisitorsToo,questionMemberOnly)\">apply</button>\n</div>\n"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], adminOptions);
    return adminOptions;
}());
exports.adminOptions = adminOptions;
//# sourceMappingURL=adminOptions.js.map