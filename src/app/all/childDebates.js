"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
require("rxjs/operator");
var Debate = (function () {
    function Debate(title, text, votes) {
        this.title = title;
        this.votes = votes || 0;
        this.text = text;
    }
    Debate.prototype.voteUp = function () { this.votes += 1; };
    ;
    Debate.prototype.voteDown = function () { this.votes -= 1; };
    ;
    return Debate;
}());
var DebateComponent = (function () {
    function DebateComponent(_http) {
        this._http = _http;
        this.subName = 'all';
    }
    ;
    DebateComponent.prototype.voteUp = function () { this.debate.voteUp(); return false; };
    ;
    DebateComponent.prototype.voteDown = function () { this.debate.voteDown(); return false; };
    ;
    DebateComponent = __decorate([
        core_1.Component({
            selector: 'reddit-debate',
            inputs: ['debate'],
            directives: [common_1.NgIf],
            host: {
                class: 'row'
            },
            template: "\n\n\n\n<div class='container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ debate.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a> Debate:{{ debate.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../DebateComments',{ id:debate.title }] \" >Debate It!</a>\n          </li>\n      </ul>\n      <p>{{ debate.text }}</p>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n      "
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], DebateComponent);
    return DebateComponent;
}());
;
//# sourceMappingURL=childDebates.js.map