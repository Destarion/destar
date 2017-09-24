"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
require("rxjs/operator");
//refutation begins
var Refutation = (function () {
    function Refutation(author, content) {
        this.author = author;
        this.content = content;
    }
    return Refutation;
}());
var RefutationComponent = (function () {
    function RefutationComponent() {
    }
    RefutationComponent = __decorate([
        core_1.Component({
            selector: 'reddit-refutation',
            inputs: ['refutation'],
            host: {
                class: 'row'
            },
            template: "\n    <div class='container'>\n    <div class=\"row-fluid\" id=\"comment-to-author\">\n    {{refutation.author}}\n    <div class='row-fluid' id=\"author-to-comment\">\n    {{refutation.content}}\n    </div>\n    </div>\n    </div>\n    "
        })
    ], RefutationComponent);
    return RefutationComponent;
}());
//refutation ends
//comment starts
var Comment = (function () {
    function Comment(Author, content, id, deepness, parentId, subName, profile, articlesId) {
        this.Author = Author;
        this.content = content;
        this.id = id;
        this.deepness = deepness;
        this.parentId = parentId;
        this.subName = subName;
        this.profile = profile;
        this.articlesId = articlesId;
        //how to add the profile of the user who is posting without running into errors if there is no user logged in?
    }
    return Comment;
}());
var CommentComponent = (function () {
    function CommentComponent(_http) {
        this._http = _http;
        this.addChild = false;
        this.notLoggedIn = false;
        this.inverseDeepness = 1;
    }
    CommentComponent.prototype.ngOnInit = function () {
        var deepness = this.comment.deepness;
        if (deepness < 5) {
            console.log("inside 5");
            this.deepness = deepness;
            this.inverseDeepness = 12 - deepness;
            console.log("deepness and stuff: " + this.comment.deepness, this.inverseDeepness);
        }
        else if (deepness > 4) {
            this.comment.deepness = 4;
            this.inverseDeepness == 12 - this.comment.deepness;
            console.log("deepness and stuff: " + this.comment.deepness, this.inverseDeepness);
        }
    };
    CommentComponent.prototype.showChildComment = function () {
        //pre:nothing,
        //post:shows the ability to add a comment
        if (this.comment.profile != "false") {
            this.addChild = true;
        }
        else if (this.comment.profile == "false") {
            this.addChild = false;
            this.notLoggedIn = true;
        }
    };
    CommentComponent.prototype.addChildComment = function (text) {
        //pre:text of the user, userName, subPage, article Name, id of parent comment
        //post:child comment saved in the database
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ parentId: this.comment.id, id: this.comment.articlesId, data: text.value, subName: this.comment.subName, profile: this.comment.profile });
        this._http.post('/comments', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { }, function (err) { return console.log(err); }, function () { return console.log("child comment adding done on the server and client side"); });
    };
    CommentComponent = __decorate([
        core_1.Component({
            selector: 'reddit-comment',
            inputs: ['comment'],
            host: {
                class: 'row'
            },
            template: "\n    <div class=\"col-md-{{deepness}}\"></div>\n    <div class=\"col-md-{{inverseDeepness}}\">\n    <div class=\"row-fluid\" id=\"comment-to-author\">\n    {{comment.Author}}\n    <div class='row-fluid' id=\"author-to-comment\">\n    {{comment.content}}\n    </div>\n    </div>\n    <div>\n    <button class=\"small-button\" (click)=\"showChildComment()\">reply</button>\n    </div>\n    <div class=\"alert alert-danger\" *ngIf=\"notLoggedIn\">You need to be logged in to do that</div>\n    <div class=\"container\" *ngIf=\"addChild\">\n    <textarea #textarea></textarea>\n    <button class=\"small-button\" (click)=\"addChildComment(textarea)\">submit</button>\n    </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], CommentComponent);
    return CommentComponent;
}());
//Comment ends
var addComments = (function () {
    function addComments(_http, _routeParams, location) {
        this._http = _http;
        this._routeParams = _routeParams;
        this.notLoggedInAlert = false;
        this.isLoggedIn = false;
        this.id = this._routeParams.get("id");
        console.log("the id: " + this.id);
        var cut = this.id.indexOf(" ");
        this.subName = this.id.substring(0, cut);
        this.articlesId = this.id.substring(cut + 1);
        this.articlesId = this.articlesId.slice(0, -1);
        this.articlesId = this.articlesId + "f";
        //the above needs heavy reconsideration//!!!
        this.userName = "false";
        console.log("the subName and articlesId: " + this.subName, this.articlesId);
        //this.profile=JSON.parse(localStorage.getItem('profile')).name;
        console.log(this.profile);
        this.comments = [];
        this.refutations = [];
        this.positive = true;
    }
    addComments.prototype.ngOnInit = function () {
        var _this = this;
        //Comment part
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //pre:subName, id of article
        //post:comments displayed
        var send = JSON.stringify({ subName: this.subName, id: this.articlesId });
        this._http.post('/commentInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log('The data will be shown here' + data.array, data.truthy);
            if (data.truthy == false) { }
            else {
                console.log("inside true, array[0] " + data.array[0].Author);
                data.array.forEach(function (comment, idx) {
                    _this.comments.push(new Comment(comment.Author, comment.content, comment._id, comment.deepness, comment.parentId, comment.subName, _this.userName, _this.articlesId));
                    var stuff;
                    var array = [];
                    var display = function (obj) {
                        obj.forEach(function (child, idx) {
                            array.push(child);
                            //this.comments.push(new Comment(child.Author,child.content,child._id,child.deepness,child.parentId,child.subName,this.userName,this.articlesId));console.log("added, the content: "+child.content)
                            /*if(child.children!=[]){
                            display(child.children);
                            }else{}*/
                        });
                    };
                    display(comment.children);
                    array.forEach(function (child, idx) {
                        _this.comments.push(new Comment(child.Author, child.content, child._id, child.deepness, child.parentId, child.subName, _this.userName, _this.articlesId));
                        console.log("added, the content: " + child.content);
                    });
                    /*     var content = comment.content;
                         var author = comment.author
                         var id = comment.id;
                         var deepness = comment.deepness
                    this.comments.push(new Comment(author,content,id,deepness));*/
                });
            }
            ;
        }, function (err) { return console.log(err); }, function () { return console.log('The comment section was succesfully initialized'); });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ a: true });
        //pre:nothing
        //post:is the user logged in, if yes, what is his name
        this._http.post("/commentUserInit", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.isAuthenticated === false) {
                _this.isLoggedIn = false;
                _this.userName = "false";
            }
            else if (data.isAuthenticated === true) {
                _this.isLoggedIn = true;
                _this.userName = data.userName;
                console.log("the new userName: " + data.userName);
            }
        }, function (err) { return console.log(err); }, function () { return console.log("the initiation of the comment pages user is finished"); });
        //Refutation Part
        //pre:id of article, subName
        //post:the refutations are retrieved and displayed
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: this.subName, id: this.id });
        this._http.post('/commentRefutationInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log('The data will be shown here');
            data.array.forEach(function (refutation) {
                /*if(data.length==0)*/ if (data.truthy == false) { }
                else {
                    console.log("the refutation stuff: " + refutation.author, refutation.content);
                    var content = refutation.content;
                    var author = refutation.author;
                    _this.refutations.push(new Refutation(author, content));
                }
            });
        }, function (err) { return console.log(err); }, function () { return console.log('The refutation section was succesfully initialized'); });
    };
    //Comment part
    addComments.prototype.addComment = function (input) {
        console.log('adding comments started');
        var profile = this.profile;
        //!!!
        //the parentId is a dummy here//
        var send = JSON.stringify({ data: input.value, subName: this.subName, id: this.articlesId, profile: this.userName, parentId: "dummy" });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/comments', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data.a); }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
    };
    //The Refuation part
    addComments.prototype.addRefutation = function (input) {
        console.log('adding refutations started');
        var profile = this.profile;
        var send = JSON.stringify({ data: input.value, subName: 'all', id: this.id, profile: 'raphael.baudeu@gmail.com' });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("before the post, we will show the send variable: " + send);
        this._http.post('/refutations', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
    };
    //Change to Refutation or to Comment
    addComments.prototype.changeToRefutation = function () {
        this.positive = false;
    };
    addComments.prototype.changeToComment = function () {
        this.positive = true;
    };
    addComments.prototype.notLoggedIn = function () {
        //pre:clicked on submit button while not logged in
        //post: displays alert message, not logged in
        this.notLoggedInAlert = true;
    };
    addComments = __decorate([
        core_1.Component({
            selector: 'add-comment',
            directives: [CommentComponent, router_deprecated_1.RouterLink, common_1.NgFor, common_1.NgIf, RefutationComponent],
            template: "\n    <div class=\"container\" *ngIf=\"positive\">\n    <nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n    <ul class=\"nav navbar-nav\">\n    <li><button class=\"btn btn-primary\" id=\"medium-button\" (click)=\"changeToComment\">Comments</button></li>\n    <li><button class=\"btn btn-primary\" id=\"medium-button\" (click)=\"changeToRefutation()\">Discussion</button></li>\n    </ul>\n    </div>\n    </nav>\n    <div class='form'>\n    <form role='form'>\n    <textarea name='text' #newtext></textarea>\n    <button class=\"btn btn-primary\" id=\"medium-button\" *ngIf=\"isLoggedIn\" (click)=\"addComment(newtext)\">submit</button>\n    <div *ngIf=\"isLoggedIn==false\">\n    <button class=\"btn btn-primary\" (click)=\"notLoggedIn()\" id=\"medium-button\">submit</button>\n    </div>\n    <div class=\"alert alert-danger\" *ngIf=\"notLoggedInAlert\">You need to be logged in to do that</div>\n    </form>\n    </div>\n    <div class=\"container\">\n     <div class=\"ui grid post\">\n    <reddit-comment *ngFor='#comment of comments' [comment] = 'comment'>\n    </reddit-comment>\n    </div>\n    </div>\n    </div>\n\n    <div class='container' *ngIf=\"positive==false\">\n    <nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n    <ul class=\"nav navbar-nav\">\n    <li><button class=\"btn btn-primary\" id=\"medium-button\" (click)=\"changeToComment()\">Comments</button></li>\n    <li><button class=\"btn btn-primary\" id=\"medium-button\" (click)=\"changeToRefutation()\">Discussion</button></li>\n    </ul>\n    </div>\n    </nav>\n    <div class='form'>\n    <form role='form'>\n    <textarea name='text' #newrefutation></textarea>\n    <button class=\"btn btn-primary\" id=\"medium-button\" (click)=\"addRefutation(newrefutation)\">submit</button>\n    </form>\n    </div>\n    <div class=\"container\">\n    <div class=\"ui grid post\">\n    <reddit-refutation *ngFor='#refutation of refutations' [refutation] = 'refutation'>\n    </reddit-refutation>\n    </div>\n    </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [http_1.Http, router_deprecated_1.RouteParams, common_1.Location])
    ], addComments);
    return addComments;
}());
exports.addComments = addComments;
//# sourceMappingURL=comments.js.map