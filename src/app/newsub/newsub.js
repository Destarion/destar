"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
require("rxjs/operator");
var validator_1 = require("./validators/validator");
var router_deprecated_1 = require("@angular/router-deprecated");
var angular2_jwt_1 = require("angular2-jwt");
var common_2 = require("@angular/common");
var newsub = (function () {
    function newsub(_http, formBuilder) {
        this._http = _http;
        this.form = formBuilder.group({
            subname: ['', validator_1.MainValidator.CannotContainSpace]
        });
    }
    ;
    newsub.prototype.logErr = function (err) {
        console.log(err);
    };
    ;
    newsub.prototype.onSubmit = function (data) {
        console.log('Start of onSubmit. Does the rest work? If yes, there should be a done message in the console.');
        this.tester = "data=" + data.value;
        console.log(this.tester);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this._http.post('http://localhost:3000/tested', this.tester, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (_body) { if (_body = "showAlert") {
            this.subExists = true;
        }
        else {
            this.subExists = false;
        } }, function (err) { return console.log(err); }, function () { return console.log('done'); });
        if (this.subExists = true) {
            window.alert('This sub already exists!');
        }
        console.log('dones');
    };
    newsub = __decorate([
        core_1.Component({
            selector: 'new-sub',
            directives: [common_1.NgModel, common_1.COMMON_DIRECTIVES, common_2.FORM_DIRECTIVES, common_2.NgIf],
            template: "\n    \n    <div class=\"container\">\n    <div class=\"form\">\n    <form [ngFormModel]=\"form\" method=\"POST\" role=\"form\" (ngSubmit)=\"onSubmit(input)\" >\n    <div>\n    <input maxlength=\"10\" minlength=\"2\"#subname=\"ngForm\" type=\"text\" #input class=\"form-control\" ngControl=\"subname\">\n    <div *ngIf=\"subname.touched && subname.errors\">\n    <div *ngIf=\"subname.errors.cannotContainSpace\" class=\"alert alert-danger\">Cannot contain space</div>\n    </div>\n    <button class=\"btn btn-primary\" >Submit</button>\n    </div>\n    </form>\n    </div>\n    </div>\n    "
        }),
        router_deprecated_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }),
        __metadata("design:paramtypes", [http_1.Http, common_2.FormBuilder])
    ], newsub);
    return newsub;
}());
exports.newsub = newsub;
;
//# sourceMappingURL=newsub.js.map