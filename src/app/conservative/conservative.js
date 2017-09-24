"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Article = (function () {
    function Article(title, link, votes) {
        this.title = title;
        this.link = link;
        this.votes = votes;
        this.votes = votes || 0;
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
            selector: 'reddit-article',
            inputs: ['article'],
            host: {
                class: 'row'
            },
            template: "\n      <div class=\"four wide column center aligned votes\">\n        <div class=\"ui statistic\">\n          <div class=\"value\"> {{ article.votes }}</div>\n          <div class=\"label\">  Points </div>\n        </div>\n      </div>\n      <div class=\"twelve wide column\">\n        <a class=\"ui large header\" href=\"{{ article.link }}\"> {{ article.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"arrow up icon\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"arrow down icon\"></i>\n              downvote\n            </a>\n          </li>\n      </ul>\n    </div>\n      "
        })
    ], ArticleComponent);
    return ArticleComponent;
}());
var Conservative = (function () {
    function Conservative() {
        this.articles = [
            new Article('breitbart', 'http://breitbart.com', 100), new Article('google', 'https://google.com', 100)
        ];
    }
    Conservative.prototype.addArticle = function (title, link) {
        this.articles.push(new Article(title.value, link.value));
        title.value = '';
        link.value = '';
    };
    Conservative = __decorate([
        core_1.Component({
            selector: 'reddit',
            directives: [ArticleComponent],
            template: "\n  \n    <form class=\"ui large form segment\">\n      <h3 class=\"ui header\">Add a Link</h3>\n        <div class=\"field\">\n          <label for=\"title\">Title:</label>\n          <input name=\"title\"  #newtitle>\n        </div>\n        <div class=\"field\">\n          <label for=\"link\">Link:</label>\n          <input name=\"link\"  #newlink>\n      </div>\n       <button (click)=\"addArticle(newtitle, newlink)\" class=\"ui positive right floated button\">\n        Submit link\n      </button>\n    </form>\n    <div class=\"ui grid posts\">\n      <reddit-article *ngFor='#article of articles' [article] = 'article'>\n      </reddit-article>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], Conservative);
    return Conservative;
}());
exports.Conservative = Conservative;
//# sourceMappingURL=conservative.js.map