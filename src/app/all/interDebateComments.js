"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
require("rxjs/operator");
var Comment = (function () {
    function Comment(id, author, content, authorRole, authorSubPage, parent) {
        this.parent = parent;
        console.log("the parent is here: " + this.parent);
        this.id = id;
        this.author = author;
        this.content = content;
        this.authorRole = authorRole;
        this.authorSubPage = authorSubPage;
    }
    return Comment;
}());
var CommentComponent = (function () {
    function CommentComponent(_http, _routeParams) {
        this._http = _http;
        this._routeParams = _routeParams;
        this.subName = "all";
        this.debate = this._routeParams.get("id");
    }
    CommentComponent.prototype.addChild = function (value) {
        console.log("a new child comment is to be added, here is its id: " + this.comment.id);
        var send = JSON.stringify({ id: this.comment.id, subName: this.subName, debate: this.debate, author: "raphael.baudeu@gmail.com", authorRole: this.role, authorSubPage: this.comment.authorSubPage, content: value });
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        this._http.post("interDebateChildComment", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("the interDebateChildComment function is finished both on the client and server side"); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommentComponent.prototype, "role", void 0);
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'reddit-inter-page-comment',
            inputs: ['comment'],
            host: {
                class: 'row'
            },
            template: "\n    <div class='container'>\n    <div class='panel panel-default'>\n    <div class='panel-body'>\n    <div class='row-fluid'>\n    {{comment.author}}\n    </div>\n    <div class='row-fluid'>\n    {{comment.content}}\n    </div>\n    </div>\n    </div>\n\n    <div *ngIf=\"comment.parent != undefined \">\n    <form>\n    <div class=\"form\" role=\"form\">\n    <label>respond: </label><input type=\"text\" class=\"input\" #childinput>\n    </div>\n    </form>\n    <button class=\"btn btn-primary btn-sm\" (click)=\"addChild(childinput.value)\">respond</button>\n    </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [http_1.Http, router_deprecated_1.RouteParams])
    ], CommentComponent);
    return CommentComponent;
}());
var addInterPageComments = (function () {
    function addInterPageComments(_http, _routeParams) {
        this._http = _http;
        this._routeParams = _routeParams;
        this.id = this._routeParams.get("id");
        this.subName = 'all';
        this.profile = "raphael.baudeu@gmail.com";
        console.log(this.profile);
        this.comments = [];
    }
    addInterPageComments.prototype.ngOnInit = function () {
        //get the roles of the subPage users, used to determine
        //what need be shown
        var _this = this;
        //In progress, to be deleted, we are now loading the comments from the comments Schema, therefore we 
        //will need to also send the comments schemas from the server into the ngInit.
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        var send = JSON.stringify({ subName: this.subName });
        this._http.post('/allRolesInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            console.log('-------------------------------');
            console.log('data.roles and its typeof : ' + data + ", " + typeof JSON.stringify(data));
            console.log('-------------------------------');
            _this.roles = data;
            _this.roles.forEach(function (role, index) {
                if (role.name == _this.profile) {
                    _this.role = role.role;
                }
                ;
            });
        }, function (err) { return console.log(err); }, function () { return console.log('allRolesInit finished on server and client side'); });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: 'all', id: this.id });
        this._http.post('/interDebateCommentInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log('The data will be shown here');
            console.log(data);
            data.forEach(function (comment) {
                var authorRole = comment.AuthorRole;
                var authorSubPage = comment.AuthorSubPage;
                var content = comment.content;
                var author = comment.Author;
                var id = comment._id;
                var parent = comment.ParentId;
                _this.comments.push(new Comment(id, author, content, authorRole, authorSubPage, parent));
            });
        }, function (err) { return console.log(err); }, function () { return console.log('The comment section was succesfully initialized'); });
    };
    addInterPageComments.prototype.addComment = function (input) {
        console.log('adding comments started');
        var profile = this.profile;
        var send = JSON.stringify({ data: input.value, subName: 'all', id: this.id, profile: 'raphael.baudeu@gmail.com', authorRole: this.role });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/interDebateComments', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
    };
    addInterPageComments = __decorate([
        core_1.Component({
            selector: 'add-inter-page-comment',
            directives: [CommentComponent, router_deprecated_1.RouterLink, common_1.NgFor],
            template: "\n    <div class='container'>\n    <div class='form'>\n    <form role='form'>\n    <textarea name='text' #newtext></textarea>\n    <button class=\"btn btn-primary\" (click)=\"addComment(newtext)\">submit</button>\n    </form>\n    </div>\n    </div>\n    <div class=\"container\">\n    <div class=\"ui grid post\">\n    <reddit-inter-page-comment *ngFor='#comment of comments' [comment] = 'comment' [role]=\"role\" >\n    </reddit-inter-page-comment>\n    </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [http_1.Http, router_deprecated_1.RouteParams])
    ], addInterPageComments);
    return addInterPageComments;
}());
exports.addInterPageComments = addInterPageComments;
//# sourceMappingURL=interDebateComments.js.map