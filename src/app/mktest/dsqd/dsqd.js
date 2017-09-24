"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var Article = (function () {
    function Article(title, link, text, votes) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
        this.text = text;
    }
    Article.prototype.voteUp = function () { this.votes += 1; };
    ;
    Article.prototype.voteDown = function () { this.votes -= 1; };
    ;
    return Article;
}());
var ArticleComponent = (function () {
    function ArticleComponent() {
    }
    ArticleComponent.prototype.voteUp = function () { this.article.voteUp(); return false; };
    ;
    ArticleComponent.prototype.voteDown = function () { this.article.voteDown(); return false; };
    ;
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'reddit-aricle',
            inputs: ['article'],
            directives: [common_1.NgIf],
            host: {
                class: 'row'
            },
            template: 'var a=1;'
        })
    ], ArticleComponent);
    return ArticleComponent;
}());
var dsqd = (function () {
    function dsqd(_RouteSegment) {
        this._RouteSegment = _RouteSegment;
        this.id = this._RouteSegment.get['id'];
        this.articles = [
            new Article('angular', 'http://angular.io', '', 100), new Article('google', 'https://google.com', '', 100)
        ];
    }
    dsqd.prototype.addArticle = function (title, link, text) {
        this.articles.push(new Article(title.value, link.value, text.value));
        title.value = '';
        link.value = '';
        text.value = '';
    };
    dsqd.prototype.clicked = function (button) {
        button.clicked = true;
    };
    dsqd.prototype.reclicked = function (button) {
        button.clicked = false;
    };
    dsqd = __decorate([
        core_1.Component({
            selector: 'reddit',
            template: "\n<div class=\"container\">\n  <h2>Welcome to the page of{{id}}</h2>\n  <div>\n  <ul class=\"list-group\">\n  <li class=\"list-group-item\">\n   <div class=\"pull-right\" >\n   <label>Close: <button \n  class=\"btn btn-primary \"\n   #button \n   (click)=\"reclicked(button)\">close</button></label>\n   </div>\n    <div class=\"pull-right\" ><label>Add article: <button \n  class=\"btn btn-primary\"\n   #button \n   (click)=\"clicked(button)\">add</button></label>\n   </div></li>\n  \n  </ul>\n  </div>\n   </div>\n   \n <div>\n  <div class='container'>\n  <div class=\"form-group\" *ngIf=\"button.clicked\">\n    <form class=\"pull-left\" role=\"form\">\n      <h3 class=\"ui header\">Add a Link</h3>\n        <div class=\"field\">\n          <label for=\"title\">Title:</label>\n          <input name=\"title\"  #newtitle class=\"inputdefault\">\n        </div>\n        <div class=\"field\">\n          <label for=\"link\">Link:</label>\n          <input name=\"link\"  #newlink class=\"inputdefault\">\n      </div>\n      <div>\n      <label for=\"text\">Text:</label>\n          <input name=\"text\"  #newtext class=\"inputdefault\">\n      </div>\n       <button (click)=\"addArticle(newtitle, newlink, newtext)\" class=\"btn btn-default\" >\n        Submit link\n      </button>\n    </form>\n    </div>\n    </div>\n    <div class=\"ui grid posts\">\n      <reddit-article *ngFor='#article of articles' [article] = 'article'>\n      </reddit-article>\n    </div>\n     </div>\n    ",
            directives: [ArticleComponent, router_deprecated_1.RouterLink, common_1.NgFor],
        }),
        __metadata("design:paramtypes", [router_deprecated_1.RouteParams])
    ], dsqd);
    return dsqd;
}());
exports.dsqd = dsqd;
//# sourceMappingURL=dsqd.js.map