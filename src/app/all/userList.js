"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
require("rxjs/operator");
var childList = (function () {
    function childList(_http) {
        this._http = _http;
        this.init = new core_1.EventEmitter();
        this.admin = false;
        this.user = "raphael.baudeu@gmail.com";
        this.userName = 'test';
        this.test = "test";
        console.log(this.userName);
    }
    childList.prototype.ngOnInit = function () {
        console.log('idx : ' + this.idx);
        this.init.emit({ idx: this.idx });
        if (this.role = "admin") {
            this.admin = true;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], childList.prototype, "admins", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], childList.prototype, "userName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], childList.prototype, "idx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], childList.prototype, "role", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], childList.prototype, "init", void 0);
    childList = __decorate([
        core_1.Component({
            selector: "child-list",
            directives: [common_1.NgIf],
            template: "<li>\n<h4>{{ userName }}:{{ role }}</h4>\n<div *ngIf=\"admin === true \">\n<button class=\"btn btn-secondary\" (click)=\"promote()\">promote</button>\n</div>\n</li>\n"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], childList);
    return childList;
}());
var userList = (function () {
    function userList(_http) {
        this._http = _http;
    }
    ;
    userList.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: 'all' });
        this._http.post('/userListInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log('the data : ' + data); _this.users = data.userList; _this.admins = data.adminList; _this.officers = data.officerList; }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
    };
    ;
    userList.prototype.onChildInit = function (idx) {
        var _this = this;
        //Pay attention! Except if a better method were to be found, we first check if the user is a moderator
        //and then if he is an admin so as to make sure that the highest role possible is attributed to the user
        console.log('onChildInit in parent : ' + idx);
        console.log('this.userName[idx] : ' + this.users[idx]);
        this.userName = this.users[idx];
        this.role = "user";
        this.officers.forEach(function (officer) {
            if (officer = _this.users[idx]) {
                _this.role = "officer";
            }
        });
        this.admins.forEach(function (admin) {
            if (admin = _this.users[idx]) {
                if (admin !== _this.userName) {
                    _this.role = "admin";
                }
                else {
                    console.log('this person is already an admin');
                }
            }
            ;
        });
    };
    ;
    userList = __decorate([
        core_1.Component({
            selector: "user-list",
            directives: [childList, common_1.NgFor],
            template: "\n<div class=\"container\">\n<div class=\"list-group\">\n<child-list [idx]=\"idx\" *ngFor=\"#user of users; let idx=index\" [admins]=\"admins\" (init)=\"onChildInit($event.idx)\" [userName]=\"userName\" [role]=\"role\"></child-list>\n</div>\n</div>\n"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], userList);
    return userList;
}());
exports.userList = userList;
;
//# sourceMappingURL=userList.js.map