"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rule = (function () {
    function Rule(title, text) {
        this.title = title;
        this.text = text;
    }
    return Rule;
}());
var RulesComponent = (function () {
    function RulesComponent() {
    }
    RulesComponent = __decorate([
        core_1.Component({
            selector: 'rules-component',
            inputs: ['rule'],
            template: "\n<div class='container'>\n<ul class=\"list-group\">\n      <div class=\"col-md-12\">\n      <li class=\"list-group-item\">\n        <a class=\"\" href=\"https://google.com\"> {{ rule.title }}</a>\n        </li>\n    </div>\n     </ul>\n    </div>\n      "
        })
    ], RulesComponent);
    return RulesComponent;
}());
;
var RedditRules = (function () {
    function RedditRules() {
        this.rules = [];
    }
    RedditRules.prototype.addRules = function (title, text) {
        this.rules.push(new Rule(title.value, text.value));
        title.value = '';
        text.value = '';
    };
    RedditRules = __decorate([
        core_1.Component({
            selector: "reddit-rules",
            directives: [RulesComponent],
            template: "\n    <div class='container'>\n    <form class=\"pull-left\">\n      <h3>Add a Link</h3>\n        <div>\n          <label for=\"title\">Title:</label>\n          <input name=\"title\"  #newtitle>\n        </div>\n        <div class=\"field\">\n          <label for=\"rules\">Rules:</label>\n          <textarea name=\"rules\"  #newtext></textarea>\n      </div>\n       <button (click)=\"addRules(newtitle, newtext)\" class=\"btn btn-default\">\n        Submit Rules\n      </button>\n    </form>\n    </div>\n    <div class>\n      <rules-component *ngFor='#rule of rules' [rule]='rule'>\n      </rules-component>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [])
    ], RedditRules);
    return RedditRules;
}());
exports.RedditRules = RedditRules;
//# sourceMappingURL=addrules.js.map