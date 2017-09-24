"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
require("rxjs/operator");
//This file is where all the actions of the admin exist
//test, to be deleted
/*
@Component({
    selector:'test',
    template:`
    <p>test</p>
    `
})
class test{

}*/
var chilAdmin = (function () {
    function chilAdmin(_http) {
        this._http = _http;
        this.idx = 1;
        this.chosen = new core_1.EventEmitter();
        this.init = new core_1.EventEmitter();
        this.choose = false;
    }
    chilAdmin.prototype.ngOnInit = function () {
        this.init.emit({ idx: this.idx });
    };
    chilAdmin.prototype.acceptUser = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: 'all', name: 'raphael.baudeu@gmail.com' });
        this._http.post('/newMember', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
        this.choose = true;
        this.chosen.emit({ data: this.user });
    };
    chilAdmin.prototype.refuseUser = function () {
        console.log('user refused');
        this.choose = true;
        this.chosen.emit({ data: this.user });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], chilAdmin.prototype, "user", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], chilAdmin.prototype, "content", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], chilAdmin.prototype, "idx", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], chilAdmin.prototype, "chosen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], chilAdmin.prototype, "init", void 0);
    chilAdmin = __decorate([
        core_1.Component({
            selector: 'child-admin',
            template: "\n<div *ngIf=\"choose === false\">\nUser:{{ user }}:\n{{ content }}\n<button class=\"btn btn-secondary btn-sm\" (click)=\"acceptUser()\">accept</button>\n<button class=\"btn btn-secondary btn-sm\" (click)=\"refuseUser()\"></button>\n</div>\n"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], chilAdmin);
    return chilAdmin;
}());
var adminPage = (function () {
    function adminPage(_http) {
        this._http = _http;
    }
    adminPage.prototype.ngOnInit = function () {
        var _this = this;
        this.thing = [];
        this.testArray = [];
        console.log('testArray onInit : ' + Array.isArray(this.testArray));
        console.log('thing onInit : ' + Array.isArray(this.thing));
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: "all" });
        this._http.post('/adminInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            console.log('the demands : ' + data.content);
            data.content.forEach(function (data) {
                var found = false;
                console.log('before anything, value of found : ' + found);
                for (var i = 0; i < _this.testArray.length; i++) {
                    console.log('this.testArray[i].user : ' + _this.testArray[i].user);
                    if (_this.testArray[i].user = data.user) {
                        console.log('inside if = true');
                        found = true;
                    }
                }
                console.log('before if/else loop, value of found : ' + found);
                if (found == false) {
                    console.log('inside found = false');
                    _this.testArray.push(data);
                }
                else {
                    console.log('already existing');
                }
            });
            _this.children = _this.testArray;
            _this.children.forEach(function (child) {
                console.log('inside the loop, value is : ' + child.content);
            });
        }, function (err) { return console.log(err); }, function () { return console.log('finished both client and server-side'); });
    };
    adminPage.prototype.onChildInit = function (idx) {
        console.log('idx of particular child : ' + idx);
        this.content = this.children[idx].content;
        this.user = this.children[idx].user;
    };
    adminPage.prototype.onChosen = function (data) {
        var _this = this;
        console.log('the user to be removed is : ' + data);
        this.children.forEach(function (child, index) {
            if (child.user = data) {
                _this.children.splice(index, 1);
                console.log('spliced!');
            }
            var headers = new http_1.Headers();
            headers.append('Content-Type', 'application/json');
            var send = JSON.stringify({ user: data, subName: 'all' });
            _this._http.post('/deleteUserDemand', send, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('finshed on client and server side'); });
        });
    };
    adminPage = __decorate([
        core_1.Component({
            selector: "admin-page",
            directives: [common_1.NgFor, common_1.NgIf, chilAdmin],
            template: "\n<div class=\"container\">\n<child-admin [content]=\"content\" [user]=\"user\" [idx]=\"idx\" *ngFor=\"let child of children;let idx = index\" (chosen)=\"onChosen($event.data)\" (init)=\"onChildInit($event.idx)\"></child-admin>\n</div>\n"
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], adminPage);
    return adminPage;
}());
exports.adminPage = adminPage;
//# sourceMappingURL=adminPage.js.map