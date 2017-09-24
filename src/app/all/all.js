"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var addrules_1 = require("../RedditRules/addrules");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
require("rxjs/operator");
//The following has the purpouse of taking all the elements that are to be rendered, and 
//render them accordingly. We will use the idx of the current element(it is retreived through the help of an input)
//to find the right one to render.
var articlesArray = (function () {
    function articlesArray(_http) {
        this._http = _http;
    }
    ;
    articlesArray.prototype.ngOnInit = function () {
        console.log("for one of them, the idx: " + this.idx);
        this.article = this.array[this.idx];
        //console.log("at the start of the childcomponent, the value of a: "+this.article.a)
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], articlesArray.prototype, "test", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], articlesArray.prototype, "idx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], articlesArray.prototype, "array", void 0);
    articlesArray = __decorate([
        core_1.Component({
            selector: 'articles-array',
            template: "\n<div *ngIf=\"article.type=='question'\">\n  <div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"col-md-1\" id=\"special-col-left\">\n    <div class=\"col-md-9\" id=\"special-col-img\">\n        <img src=\"../assets/img/8963.png\" id=\"arrow-head-img\" class=\"img-fluid\">\n        </div>\n        <div class=\"col-md-3\" id=\"special-col\">\n{{ article.votes }}\n</div>\n    </div>\n      <div class=\"col-md-11\" id=\"special-col-right\">\n                 <div id=\"body-header\">\n              <a href (click)=\"voteUp()\">upvote</a><a href (click)=\"voteDown()\">downvote</a>\n    </div>\n            {{article.title  }}<p>  </p>\n          <a [routerLink]=\" ['../Comments',{ id:article.commentsId }] \" >Comments</a>\n    </div>\n    </div>\n    </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"article.type=='article'\">\n  <div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Pointsarticle: {{ article.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a class=\"\" href=\"{{ article.link }}\"> {{ article.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../Comments',{ id:article.commentsId }] \" >Comments</a>\n          </li>\n      </ul>\n      <p>{{ article.text }}</p>\n    </div>\n    <div *ngIf=\"works === true\">\n<button clas=\"btn btn-primary btn-sm\" (click)=\"onDelete()\">delete</button>\n</div>\n    </div>\n    </div>\n    </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"article.type=='interDebate'\">\n  <div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ article.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a> Debate:{{ article.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../InterPageDebateComments',{ id:article.commentsId }] \" >Debate It!</a>\n          </li>\n      </ul>\n      <p>{{ article.text }}</p>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"article.type=='debate'\">\n  <div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ article.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a> Debate:{{ article.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../DebateComments',{ id:article.commentsId }] \" >Debate It!</a>\n          </li>\n      </ul>\n      <p>{{ article.text }}</p>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n  </div>\n  ",
            directives: [common_1.NgIf],
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], articlesArray);
    return articlesArray;
}());
//The following is what is used for the question asking, which can also, if wished by admin,
//be used by non-members. This, with the debate, radio poll and articles should all be moved
//to separate files, with if possible one component per file.
var Question = (function () {
    function Question(commentsId, id, title, text, votes) {
        this.commentsId = commentsId;
        this.id = id;
        this.title = title;
        this.votes = votes || 0;
        this.text = text;
    }
    Question.prototype.voteUp = function () { this.votes += 1; };
    ;
    Question.prototype.voteDown = function () { this.votes -= 1; };
    ;
    return Question;
}());
var QuestionComponent = (function () {
    function QuestionComponent(_http) {
        this._http = _http;
        this.subName = 'all';
    }
    ;
    QuestionComponent.prototype.voteUp = function () { this.question.voteUp(); return false; };
    ;
    QuestionComponent.prototype.voteDown = function () { this.question.voteDown(); return false; };
    ;
    QuestionComponent = __decorate([
        core_1.Component({
            selector: 'reddit-question',
            inputs: ['question'],
            directives: [common_1.NgIf],
            host: {
                class: 'row'
            },
            template: "\n<div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ question.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n         <h4>{{ question.title }}</h4>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../Comments',{ id:question.title }] \" >Comments</a>\n          </li>\n      </ul>\n      <p>{{ question.text }}</p>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n      "
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], QuestionComponent);
    return QuestionComponent;
}());
//End of question
//§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
//Inside here is all the radio stuff
//-
//In order to use keyup or another method for the changing of values in an array, a better understanding of the
//output method is to be acquired, as currently such a change would result in the value being undefined in the parent
//Component. I have a suspiscion it has to do with the time it takes the event to finish, as the problem is present 
//even with the button as the event starter IF there are more than one value passed to the parent Component.
//-
//Question Component
var radioQuestion = (function () {
    function radioQuestion() {
        this.questionEvent = new core_1.EventEmitter();
    }
    radioQuestion.prototype.onClick = function (value) {
        this.questionEvent.emit({ value: value });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], radioQuestion.prototype, "questionEvent", void 0);
    radioQuestion = __decorate([
        core_1.Component({
            selector: 'radio-question',
            template: "\n<div>\n<h4>Question</h4>\n<input type=\"text\" #newquestion>\n<button class=\"btn\" (click)=\"onClick(newquestion.value)\">add</button>\n"
        }),
        __metadata("design:paramtypes", [])
    ], radioQuestion);
    return radioQuestion;
}());
//Radio possible answers component
var Radio = (function () {
    function Radio() {
        this.change = new core_1.EventEmitter();
    }
    ;
    Radio.prototype.onKey = function (value) {
        console.log('This is the value inside the ChildComponent ' + value);
        this.change.emit({ value: value });
    };
    ;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], Radio.prototype, "change", void 0);
    Radio = __decorate([
        core_1.Component({
            selector: 'radio-component',
            template: "\n<div>\n<input type=\"text\" #newradiotext >\n<button class=\"btn btn-primary\" (click)=\"onKey(newradiotext.value)\">add</button>\n</div>  \n  "
        }),
        __metadata("design:paramtypes", [])
    ], Radio);
    return Radio;
}());
;
//§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
//The following sections is what is used for the debateArticles. The logic however is present
//In the RedditApp class.This part should be moved to it's own file to prevent to large files.
var Debate = (function () {
    function Debate(id, commentsId, title, text, author, votes) {
        this.id = id;
        this.commentsId = commentsId;
        this.author = author;
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
            template: "\n<div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ debate.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a> Debate:{{ debate.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../DebateComments',{ id:debate.title }] \" >Debate It!</a>\n          </li>\n      </ul>\n      <p>{{ debate.text }}</p>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n      "
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], DebateComponent);
    return DebateComponent;
}());
;
//End of the debateArticle section.
//The following sections is what is used for the interdebateArticles. The logic however is present
//In the RedditApp class.This part should be moved to it's own file to prevent to large files.
//the problem is somewhere in here (there are things in the all component that I put in comments and are to be reverted before testing)
var InterDebate = (function () {
    function InterDebate(title, text, author, authorRole, authorSubPage, votes) {
        this.title = title;
        this.text = text;
        this.author = author;
        this.authorRole = authorRole;
        this.authorSubPage = authorSubPage;
        this.votes = votes || 0;
    }
    InterDebate.prototype.voteUp = function () { this.votes += 1; };
    ;
    InterDebate.prototype.voteDown = function () { this.votes -= 1; };
    ;
    return InterDebate;
}());
var InterDebateComponent = (function () {
    function InterDebateComponent(_http) {
        this._http = _http;
        this.subName = 'all';
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;: ");
    }
    ;
    InterDebateComponent.prototype.voteUp = function () { this.interdebate.voteUp(); return false; };
    ;
    InterDebateComponent.prototype.voteDown = function () { this.interdebate.voteDown(); return false; };
    ;
    InterDebateComponent = __decorate([
        core_1.Component({
            selector: 'reddit-inter-debate',
            inputs: ['interdebate'],
            directives: [common_1.NgIf],
            host: {
                class: 'row'
            },
            template: "\n<div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ interdebate.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a> Debate:{{ interdebate.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../InterPageDebateComments',{ id:interdebate.title }] \" >Debate It!</a>\n          </li>\n      </ul>\n      <p>{{ interdebate.text }}</p>\n    </div>\n    </div>\n    </div>\n    </div>\n    </div>\n      "
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], InterDebateComponent);
    return InterDebateComponent;
}());
;
//Must check to see if this and the member class can be deleted.
var Results = (function () {
    function Results() {
    }
    return Results;
}());
exports.Results = Results;
var Member = (function () {
    function Member(name) {
        this.name = name;
    }
    return Member;
}());
var Article = (function () {
    function Article(commentsId, id, title, link, text, author, votes) {
        this.commentsId = commentsId;
        this.id = id;
        this.title = title;
        this.author = author;
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
    function ArticleComponent(_http) {
        this._http = _http;
        this.false = false;
        this.initEvent = new core_1.EventEmitter();
        this.deleteEvent = new core_1.EventEmitter();
        this.subName = 'all';
        this.test = true;
    }
    ;
    ArticleComponent.prototype.voteUp = function () { this.article.voteUp(); return false; };
    ;
    ArticleComponent.prototype.voteDown = function () { this.article.voteDown(); return false; };
    ;
    ArticleComponent.prototype.ngAfterContentInit = function () {
        console.log('---------------------------');
        console.log('One article has been inited, this.userRole: ' + this.userRole);
        console.log('---------------------------');
        this.initEvent.emit({});
        console.log('emited.');
        if (this.userRole == "Officer" || this.userRole == "Admin") {
            console.log("The user is an officer or an admin");
            if (this.authorRole == this.userRole) {
                console.log('users have the same role');
                if (this.authorRole !== "admin") {
                    console.log("We can finally have works = true");
                    this.works = true;
                }
                else {
                    console.log("the user and the author were both admins, there cannot be a delte");
                    this.works = false;
                }
                ;
            }
            console.log("We do not hace the same rank, one of them must be an officer and the other an admin.");
            if (this.userRole == "Admin") {
                console.log("We can now delete, as the user is an admin and the author is an officer.");
                this.works = true;
            }
        }
        else {
            console.log("Works must be false as the user is neither an officer nor an admin.");
            this.works = false;
        }
        console.log("OnInit finished");
    };
    ArticleComponent.prototype.onDelete = function () {
        console.log('the Delete function was started on the child component.');
        this.deleteEvent.emit({});
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "initEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "deleteEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "authorRole", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ArticleComponent.prototype, "userRole", void 0);
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'reddit-article',
            inputs: ['article'],
            directives: [common_1.NgIf],
            host: {
                class: 'row'
            },
            template: "\n<div class='fluid-container'>\n<div class=\"panel panel-default\">\n<div class=\"panel-body\">\n    <div class=\"row-fluid\">\n        <div class=\"ui statistic\">\n          <div class=\"value\">Points: {{ article.votes }}</div>\n          \n        </div>\n      <div class=\"col-md-8\">\n        <a class=\"\" href=\"{{ article.link }}\"> {{ article.title }}</a>\n        <ul class=\"ui big horizontal list voters\">\n          <li class=\"item\">\n            <a href (click)=\"voteUp()\">\n              <i class=\"glyphicon-arrow-up\"></i> upvote\n            </a>\n          </li>\n          <li class=\"item\">\n            <a href (click)=\"voteDown()\">\n              <i class=\"glyphicon-arrow-down\"></i>\n              downvote\n            </a>\n          </li>\n          <li class=\"item\">\n          <a [routerLink]=\" ['../Comments',{ id:article.title }] \" >Comments</a>\n          </li>\n      </ul>\n      <p>{{ article.text }}</p>\n    </div>\n    <div *ngIf=\"works === true\">\n<button clas=\"btn btn-primary btn-sm\" (click)=\"onDelete()\">delete</button>\n</div>\n    </div>\n    </div>\n    </div>\n    </div>\n      "
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], ArticleComponent);
    return ArticleComponent;
}());
var RedditApp = (function () {
    function RedditApp(_RouteSegment, _http, _router, location) {
        this._RouteSegment = _RouteSegment;
        this._http = _http;
        this._router = _router;
        this.isAdmin = false;
        this.warningWrongUrl = false;
        this.dropdownBoolean = false;
        this.dropdown = "hidden";
        this.parents = [];
        this.addNewSubBoolean = false;
        this.pageCount = 1;
        this.test = 1;
        this.articleButton = false;
        this.debateButton = false;
        this.questionButton = false;
        this.allPostOptions = false;
        this.interDebateRadioValue = false;
        this.debateRadioValue = false;
        this.articleRadioValue = false;
        this.questionRadioValue = false;
        this.interDebateChildren = false;
        this.interPageDebateButton = false;
        this.false = false;
        this.noAdditionalParents = false;
        this.parent1 = false;
        this.parent2 = false;
        this.parent3 = false;
        this.loggedIn = false;
        this.clickedOnSub = false;
        this.radioNotLoggedIn = false;
        this.alreadyMember = false;
        this.newMemberNotloggedIn = false;
        this.isMember = false;
        this.radioNotMember = false;
        this.alreadyBrotherUser = false;
        this.booleanArray = [];
        this.pathname = location.prepareExternalUrl(location.path());
        this.roles = [{ name: "test", role: "hehe" }];
        this.modal = false;
        this.articleTestButton = false;
        this.debateTestButton = false;
        this.radio;
        this.questions = [];
        //!!
        //continue here, populate questions with the server side, where all neccessary steps
        //on server and database should be made.
        this.articlesArray = [];
        this.array = [];
        this.profiler = false;
        this.radioButton = false;
        this.pageCount = this._RouteSegment.get("id");
        this.debates = [];
        this.subName = 'all';
        this.results = [{ title: String, link: String, text: String }];
        this.radios = [new Radio, new Radio];
        var articles = this.articles;
        this.productionArray = [];
        this.arraytest = [];
        this.parentsMod = [];
        this.articles = [];
    }
    RedditApp.prototype.ngOnInit = function () {
        var _this = this;
        //pre:subName,userName;
        //post:is the user an admin
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ userName: this.profile, subName: this.pathname });
        this._http.post('/isAdmin', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { if (data.loggedIn == false) {
            _this.isMember = false;
        }
        else if (data.a == false) {
            _this.isAdmin = false;
        }
        else if (data.a == true) {
            _this.isAdmin = true;
        } }, function (err) { return console.log(err); }, function () { return console.log('the function to determine if the user is an admin is finished properly on both the client and server-side'); });
        //pre:subName,userName;
        //post:is the user a member
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ userName: this.profile, subName: this.pathname });
        this._http.post('/isMember', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { if (data.loggedIn == false) {
            _this.isMember = false;
        }
        else if (data.a == false) {
            _this.isMember = false;
        }
        else if (data.a == true) {
            _this.isMember = true;
            console.log("is member");
        } }, function (err) { return console.log(err); }, function () { return console.log('the function to determine if the user is an admin is finished properly on both the client and server-side'); });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: this.pathname });
        this._http.post("/doesPageExist", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log("Does the subpage exist?"); if (data === false) {
            console.log('data false');
            _this._router.navigateByUrl('/');
        } }, function (err) { return console.log("err"); }, function () { });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ a: true });
        this._http.post('/isLoggedIn', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.a === true) {
                _this.loggedIn = true;
                console.log("on logged in, the data.userName: " + data.userName);
                _this.profile = data.userName;
            }
            else {
                _this.loggedIn = false;
            }
        }, function (err) { return console.log(err); }, function () { return console.log("the isLoggedIn all request has been done"); });
        // Searching the name of the current subPage
        // This is the section that sould use the location.path to search on the server
        //to see if there is a subpage that is good with the current path, and if not
        //sends an error message and an error status that translates in "subpage does not exist"
        //The question is to know how to use the complex path with the different "/"
        //Aswell as and perhaps more importantly how to implement it
        //The solution is to simply let the user do it and then handle the route as simply a route 
        //One can then, if correctly useable, use the info very well to simply
        //Know all the parents of a given route 
        //The only problem is then how to access the parent route, 
        //Easy solution:If saved on the creation of the subpage, the parent is Easy to access thanks
        //to the fact that both the parent and the child are unique
        //end of the search
        if (this.pageCount == undefined) {
            //post:sets pageCount to 0 if it is not stated
            this.pageCount = 0;
            console.log(this.pageCount);
        }
        //Attention please! The system that has been put in place to get everything inside the articlesArray is built 
        //on top of the old system. It works but many things are obscolete and are to be deleted or replaced entirely
        //this.articlesArray.push({author:'aoi',text:'a',title:'api',type:'question'})
        //get the interPageDebates from the server and display them on the page
        //This one seems to be obscolete, to be deleted if it is so
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: this.pathname });
        this._http.post("/interDebateFetch", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("the important data: " + data);
            if (data) {
                data.forEach(function (child, index) {
                    console.log(child.text, child.title + "§§§§§§§§§§§§§§§");
                });
            }
            var title;
            data.forEach(function (child, index) {
                console.log('once inside the loop, the child: ' + child.title);
                if (typeof child.title == "undefined" || typeof child.text == "undefined" || typeof child.author == "undefined" || typeof child.authorSubPage == "undefined") {
                    console.log("something inside the data.forEach is wrong(one of the interDebates function), one of the values(or more)seem to be false");
                }
                else {
                    //!!!To be deletd
                    //dont quite know why this is here
                    // if(title==child.title/*to be replaced with an id, as in many other places*/){
                    /*  console.log("already existing")*/
                    //}else{
                    //!!!To be deleted
                    //check if adding a new 
                    //interpagedebate will result in it showing up
                    //!!!
                    title = child.title;
                    _this.interDebates = [];
                    _this.productionArray.push({ type: "interDebate", title: child.title, text: child.text, author: child.author });
                    _this.interDebates.push(new InterDebate(child.title, child.text, child.author, child.authorRole, child.authorSubPage));
                    console.log("pushed, the interdebates: " + _this.interDebates);
                }
            });
        }, function (err) { return console.log(err); }, function () { return console.log("the fetching of the interDebatePages is finished both on the client and the server side"); });
        //what is the difference between this and the above?
        //One may be obscolete
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        console.log("before the sending of the subName:" + this.pathname);
        var send = JSON.stringify({ subName: this.pathname });
        this._http.post("/interPageDebateInit", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("useless, to get your attention!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log("data children, typeof: " + data.children + typeof (data.children));
            //continue here, the problem is that the idx is used before, probably do index+1, or smthng else
            if (data.children) {
                data.children.forEach(function (child, index) {
                    if (child == _this.subName) {
                        console.log("found the right child to delete");
                        _this.booleanArray.push({ value: _this.pathname, idx: index, true: true });
                        data.children.splice(index, 1);
                    }
                });
            }
            _this.interDebateChilds = data.children;
        }, function (err) { return console.log(err); }, function () { return console.log("finsihed the interPageDebateInit both on the client and the server side"); });
        //Get the value of the options for this subPage
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        var send = JSON.stringify({ subName: this.pathname });
        this._http.post("/optionsLoad", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            _this.memberRequest = data.memberRequest;
            _this.questionVisitors = data.questionVisitors;
            console.log("§§§§§§§");
            console.log("Before anything, the values of questionVisitors and memeberRequest: " + _this.questionVisitors + " " + _this.memberRequest);
            console.log("§§§§§§§");
        }, function (err) { return console.log(err); }, function () { return console.log("optionsLoad is finsihed both on the client and server side"); });
        //get the roles of the subPage users, used to determine
        //what need be shown
        var headers = new http_1.Headers();
        headers.append("Content-Type", 'application/json');
        var send = JSON.stringify({ subName: this.pathname });
        this._http.post('/allRolesInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            console.log('-------------------------------');
            console.log('data.roles and its typeof : ' + data + ", " + typeof JSON.stringify(data));
            console.log('-------------------------------');
            _this.roles = data;
            if (_this.roles) {
                _this.roles.forEach(function (role, index) {
                    if (role.name == _this.profile) {
                        _this.role = role.role;
                        _this.articleUserRole = role.role;
                        console.log('role of the user found');
                    }
                    ;
                });
            }
        }, function (err) { return console.log(err); }, function () { return console.log('allRolesInit finished on server and client side'); });
        //Check if the profile is an Officer (later Checking if he is a user should be added too)
        //To be updated to use the new version of the login aswell as actual login infos
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.profiler = false;
        var subName = "all";
        var send = JSON.stringify({ profile: this.profile, subName: this.pathname });
        this._http.post('/UserCheck', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log(data); if (data.officer = true) {
            _this.profiler = true;
        }
        else {
            _this.profiler = false;
        } }, function (err) { return console.log(err); }, function () { return console.log('UserCheck completed without errors on client and server side'); });
        //load all the questions from the server
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: this.pathname });
        this._http.post('/questionInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            if (data) {
                data.forEach(function (question) {
                    var title = question.title;
                    var text = question.text;
                    var author = question.author;
                    var id = question._id;
                    var commentsId = _this.pathname + " " + id;
                    console.log('question title,text,author : ' + title + ' ' + text + ' ' + author);
                    _this.questions.push(new Question(commentsId, id, title, text, author));
                    _this.productionArray.push({ type: "question", commentsId: commentsId, id: id, title: title, text: text, author: author });
                });
            }
            ;
        }, function (err) { return console.log(err); }, function () { return console.log('questionInit finsihed on both client and server side'); });
        //load all the articles of the page
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var subName = JSON.stringify({ subName: this.pathname });
        var post = this._http.post('/pageInit', subName, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            /* if(data===false){
               //pre:subPage does not exist
               //post:warn user, redirect to home(for now)
               //!!!
               //1:maybe have to change the url
               //2:redirect to subreddit search
               //!!!
               console.log("data false")
               this.warningWrongUrl = true;
             this._router.navigateByUrl('http://localhost:3000/')
             }else{*/
            console.log('to be deleted; data started, the parents: ' + data.parents);
            _this.parents = data.parents;
            if (_this.parents) {
                _this.parents.forEach(function (obj, idx) {
                    console.log("To be deleted; in the parents, the idx: " + idx);
                    console.log("*µ*µ**µ£$$£¨¨^$^$$¨^ù%ùù*µù*^£^£after the first push, the parentsMod, the type: " + typeof _this.productionArray);
                    if (idx == 0) {
                        console.log("!!!To be deleted/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/§/we are in the first idx, the object: " + obj);
                        _this.parent1 = obj;
                    }
                    else if (idx = 1) {
                        _this.parent2 = obj;
                    }
                    else if (idx = 2) {
                        _this.parent3 = obj;
                    }
                    else if (idx > 2) {
                        _this.arraytest.push(obj);
                    }
                });
            }
            ;
            if (_this.parentsMod.length = 0) {
                _this.noAdditionalParents = true;
            }
            //!!!to be deleted
            //it is here where the fetching of the parent should happen
            //on the server a loop will search for a parent until there is none left and send 
            //it back in the order most to least recent parent.
            //this is then used to display with an ngFor in the template
            //there are only 2 parents(plus the actual page) to be displayed, the 
            //rest is accessible by a (...) at the end of the element
            //!!!
            //for each article renders it on the page.
            if (data.articles) {
                data.articles.forEach(function (article) {
                    var title = article.title;
                    var link = article.link;
                    var text = article.text;
                    var author = article.author;
                    var id = article._id;
                    var commentsId = _this.pathname + " " + id;
                    console.log("the articles commentsId: dsqdqsdqsazé" + commentsId);
                    _this.articles.push(new Article(commentsId, id, title, author, link, 0, text));
                    // the error is that the content of the articles is labeled as undefined
                    //which can be caused either by the article being itself undefined
                    //or by the article to be of the wrong type
                    // interesting bit of consol, after asking for the typeof the text, we get
                    //this: The current article s title,text,link and author:string link  undefined
                    if (typeof article.title == null || typeof article.title == undefined || typeof article.text == null || typeof article.text == undefined || typeof article.link == null || typeof article.link == undefined) {
                        console.log("one article has an undefined or null title, link or text ");
                    }
                    else {
                        _this.productionArray.push({ type: "article", commentsId: commentsId, id: id, title: title, link: link, text: text, author: author });
                    }
                    ;
                    //!! I am pushing directly to the productionArray her
                    //articlesArray, to be seen if this is more effective
                });
            }
            ;
            /*}*/ 
        }, function (err) { return console.log(err); });
        //load all the Debates of the page
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var subName = JSON.stringify({ subName: this.pathname });
        var post = this._http.post('/debateInit', subName, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log('data started');
            //for each article renders it on the page.
            var pageCount = _this.pageCount;
            var articlesArray = _this.articlesArray;
            var productionArray = _this.productionArray;
            function callback() {
                //here the productionArray is pushed, it is here to make sure that it comes last, if not it is to be placed somewhere else.
                var number = pageCount;
                var beNumber = number * 50;
                var afNumber = number + 50;
                //probably to be deleted, or at the very least replaced
                if (articlesArray) {
                    articlesArray.forEach(function (obj, index) {
                        console.log("starting one forEach obj:ù*^$^:$^:$*^$*ù:*mùp^$:^p^*");
                        console.log(index);
                        if (index <= afNumber && index > beNumber) {
                            productionArray.push(obj);
                            console.log("an object was pushed in the productionArray: " + obj, index);
                        }
                    });
                }
            }
            ;
            if (data) {
                data.forEach(function (debate) {
                    //this.articlesArray.push({type:'question',title:"test",text:"testText",author:"testAuthor"})
                    var title = debate.title;
                    var text = debate.text;
                    var author = debate.author;
                    var id = debate._id;
                    var commentsId = _this.pathname + " " + id;
                    //console.log("For one of the debates, the title, text and author: "+title,text,author);
                    _this.debates.push(new Debate(commentsId, id, title, text, author));
                    _this.productionArray.push({ type: "debate", commentsId: commentsId, id: id, title: title, text: text, author: author });
                });
            }
            ;
            setTimeout(function () {
                callback();
                _this.articlesArray = articlesArray;
                _this.productionArray = productionArray;
                console.log("!ù*ù!ù*!ùù*!ù*!^$the this.productionArray after the change: " + _this.productionArray, _this.productionArray.length);
            }, 3267);
            //changes the pagecount so that the page changes when clicking on "next"
            _this.pageCount == _this.pageCount + 1;
        }, function (err) { return console.log(err); });
    };
    ;
    RedditApp.prototype.addArticle = function (title, link, text) {
        console.log(title);
        console.log(title.value);
        var author = this.profile;
        var newTitle = title.value;
        var newLink = link.value;
        var newText = text.value;
        console.log("on the creation of a new article, the typeof the object of the title: " + newTitle);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log(title.value);
        var send = JSON.stringify({ title: title.value, link: link.value, text: text.value, subName: this.pathname, author: author });
        this._http.post('http://localhost:3000/content', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return data = send; }, function (err) { return console.log(err); }, function () { return console.log('post adding done on both client and server side!'); });
    };
    ;
    RedditApp.prototype.addQuestion = function (title, text) {
        console.log('in the add method for question: title,text : ' + title.value + ' ' + text.value);
        var send = JSON.stringify({ subName: this.pathname, title: title.value, text: text.value, author: this.profile });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/questionContent', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('question adding finished both on client and server side'); });
    };
    RedditApp.prototype.addDebateArticle = function (debateTitle, debateText) {
        //Pay attention! Here are saved to the server the values of answer and question for the poll. There appears to be a problem whereas if on sends the request soon after having created the 
        //answers and questions, they are undefined, a checking system needs therefore to be put in place.
        //Pay Attention! There is ALLOT more security needed than what is spoken about on top, for example not allowing the use of the same answer twice. This is true for many other addings.
        var newTitle = debateTitle.value;
        var newText = debateText.value;
        var profile = this.profile;
        console.log(debateTitle.value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log(debateTitle.value);
        var send = JSON.stringify({ title: debateTitle.value, text: debateText.value, subName: this.pathname, question: this.quest, answers: this.array, author: this.profile });
        this._http.post('/debateContent', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return data = send; }, function (err) { return console.log(err); }, function () { return console.log('post adding done on both client and server side!'); });
    };
    RedditApp.prototype.clicked = function (button) {
        //Continue here, doesn't open the page, perhaps the button is not correctly set to true or there is an error in the template
        console.log('user role on button click: ' + this.role);
        if (this.role == "Admin" || this.role == "Officer" || this.role == "User") {
            console.log('this.articleButton before : ' + this.articleTestButton);
            this.articleTestButton = true;
            console.log('this.articleButton after : ' + this.articleTestButton);
        }
        else {
            console.log('not a good role!');
            this.modal = true;
        }
    };
    RedditApp.prototype.reclicked = function (button) {
        this.articleTestButton = false;
    };
    RedditApp.prototype.clickedDebate = function (debatebutton) {
        //Continue here, doesn't open the page, perhaps the button is not correctly set to true or there is an error in the template
        console.log('user role on button click: ' + this.role);
        //if(this.role==="Admin"||this.role==="Officer"||this.role==="User"){
        if ('all' == 'all') {
            console.log('this.debateButton before : ' + this.debateTestButton);
            this.debateTestButton = true;
            console.log('this.debateButton after : ' + this.debateTestButton);
        } //else{
        //  console.log('not a good role!');
        //this.modal=true;
        //console.log('this.modal: '+this.modal)
        //}
    };
    RedditApp.prototype.unclickedDebate = function (debatebutton) {
        this.debateTestButton = false;
    };
    RedditApp.prototype.clickedQuestion = function (questionbutton) {
        if (this.questionButton == false) {
            this.questionButton = true;
        }
        else {
            this.questionButton = false;
        }
    };
    //To be destroyed, replaced
    /*
    newMember(){
      console.log('newMember started');
      this.profile=JSON.parse(localStorage.getItem('profile'));
      var subName ='all';
      var profile='raphael.baudeu@gmail.com'
      var member=JSON.stringify({name:profile,subName:subName})
      console.log(member);
      var headers = new Headers();
      headers.append('Content-Type','application/json');
      this._http.post('http://localhost:3000/newMember',member, {headers:headers})
      .map(res=>{if(res.status=310){console.log('User already a member');window.alert('Already a member!')}
      else{return res.json()}})
      .subscribe(
        data=>data=member,
        err=>console.log(err),
         ()=>console.log('Procces finished!')
          )
          console.log('finish')
          
    }*/
    RedditApp.prototype.newOfficer = function () {
        console.log('new Officer started');
        var profile = "raphael.baudeu@gmail.com";
        var subName = this.pathname;
        var send = JSON.stringify({ profile: profile, subName: subName });
        console.log(send);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('http://localhost:3000/newOfficer', send, { headers: headers })
            .map(function (res) {
            if (res.status = 310) {
                console.log('User already a member');
                window.alert('Already a member!');
            }
            else {
                return res.json();
            }
        })
            .subscribe(function (data) { return console.log('this is the data: ' + data); }, function (err) { return console.log(err); }, function () { return console.log('Procces finished!'); });
        console.log('finish');
    };
    RedditApp.prototype.addRadio = function () {
        console.log('poll adding started');
        this.radioButton = true;
        console.log(this.radioButton);
    };
    RedditApp.prototype.addOption = function () {
        this.radios.push(new Radio);
    };
    RedditApp.prototype.onChange = function (value, idx) {
        var _this = this;
        if (value === undefined) {
            console.log('err, value undefined');
        }
        this.value === value;
        console.log('value ' + this.value);
        console.log(this.array);
        console.log(value);
        console.log(idx);
        console.log('startig the adding in the array');
        if (this.array.length > 0) {
            console.log("starting forEach");
            if (this.array) {
                this.array.forEach(function (el, index) {
                    console.log('forEach started for an element');
                    function findIdx(obj) {
                        return obj.idx === idx;
                    }
                    //The following code uses ECMAScript 6 only function array.prototype.find(),a polyfill must be added
                    if (_this.array.find(findIdx) !== undefined) {
                        if (el.idx === idx) {
                            console.log('the two values: ' + el.value + value);
                            console.log('el.indexOf started(there is an idx in the array matching the given idx)');
                            //this.array.splice(idx,1,{idx:idx,value:obj.value});
                            el.value = value;
                            console.log(el);
                            console.log(_this.array[idx]);
                            console.log("el.value was changed.This is it's new value: " + el.value);
                        }
                        else {
                            console.log("Nothing to do here, it isn't the object we want to change");
                        }
                    }
                    else {
                        console.log('we are pushing a new value to the array, there is no idx in the array matching the current one');
                        _this.array.push({ idx: idx, value: value });
                    }
                });
                console.log(this.array);
            }
        }
        else {
            console.log('the array has no values');
            this.array.push({ idx: idx, value: value });
            console.log(this.array);
        }
        console.log(this.array);
    };
    ;
    RedditApp.prototype.question = function (value) {
        console.log(value);
        this.quest = value.value;
        console.log(this.quest);
        console.log(value.value);
    };
    RedditApp.prototype.newAdmin = function () {
        var send = JSON.stringify({ userName: "raphael.baudeu@gmail.com", subName: this.pathname });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/newAdmin', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log('data : ' + data); }, function (err) { return console.log(err); }, function () { return console.log('completed'); });
    };
    RedditApp.prototype.onModalClick = function (value, content) {
        console.log('onModalClick started, the value of the newmodaltext input is: ' + value);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ userName: value, subName: this.pathname, text: content });
        this._http.post('/userDemand', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log('The full data is: ' + data); }, function (err) { return console.log(err); }, function () { return console.log('The userDemand function is finished on the server and client side'); });
    };
    RedditApp.prototype.articleInit = function (idx) {
        var _this = this;
        console.log('on articleInit, the idx: ' + idx);
        if (this.articles) {
            this.articles.forEach(function (article, index) {
                if (idx == index) {
                    console.log('found correct article');
                    var author = article.author;
                    console.log("This.roles before the forEach function started");
                    console.log(": §§§§§§§§§§§§§§§§§§§§§" + _this.roles);
                    if (_this.roles) {
                        _this.roles.forEach(function (role, index) {
                            console.log('--------------');
                            console.log("We are inside the articleInit function, here is the role: " + JSON.stringify(role.name));
                            console.log('--------------');
                            if (role.name = author) {
                                console.log('the userRole was found: ' + role.name);
                                _this.articleAuthorRole = role.role;
                            }
                        });
                    }
                    ;
                }
            });
        }
        ;
    };
    RedditApp.prototype.onArticleDelete = function (idx) {
        var _this = this;
        console.log("The idx onArticleDelete is: " + idx);
        if (this.articles) {
            this.articles.forEach(function (article, index) {
                if (index == idx) {
                    console.log('found the right idx');
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    var send = JSON.stringify({ subName: _this.pathname, title: article.title, author: article.author });
                    _this._http.post('/deleteArticles', send, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("deleteArticles finished both on client and server side"); });
                }
            });
        }
        ;
    };
    RedditApp.prototype.newMember = function () {
        var _this = this;
        //pre:subName, userName
        //post:user either becomes a member or getes an alert saying that he is already a member/a member of another subPage
        if (this.loggedIn == false) {
            this.newMemberNotloggedIn = true;
        }
        else {
            console.log("started the newMember function");
            var headers = new http_1.Headers();
            headers.append("Content-Type", "application/json");
            console.log("just before the new profile, the profile: " + this.profile);
            var send = JSON.stringify({ subName: this.pathname, name: this.profile });
            this._http.post("/newMember", send, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) { if (data.a == false) {
                console.log("the data.a is false");
                _this.alreadyMember = true;
            } if (data.brotherUser == true) {
                _this.alreadyBrotherUser = true;
            } }, function (err) { return console.log(err); }, function () { return console.log("The newMember function finished both on the client and the server side"); });
        }
    };
    RedditApp.prototype.openInterPageDebate = function () {
        if (this.interPageDebateButton == false) {
            this.interPageDebateButton = true;
        }
        else if (this.interPageDebateButton == true) {
            this.interPageDebateButton = false;
        }
    };
    RedditApp.prototype.onInterPageChildren = function () {
        if (this.interDebateChildren == false) {
            this.interDebateChildren = true;
        }
        else {
            this.interDebateChildren = false;
        }
        ;
    };
    RedditApp.prototype.interDebateInit = function (idx) {
        console.log("interDebateInit started, idx: " + idx);
        console.log("!!!!!!!,second interDebateChilds, interDebateChilds[idx]: " + this.interDebateChilds, this.interDebateChilds[idx]);
        this.child = this.interDebateChilds[idx];
    };
    RedditApp.prototype.onInterPageDebateSelect = function (value, idx) {
        var _this = this;
        console.log("the booleanArray, length: " + this.booleanArray);
        console.log("onInterPageDebateSelect started, the values of value, idx: " + value + idx);
        console.log("the length of the array: " + this.booleanArray.length);
        if (this.booleanArray.length > 0) {
            if (this.booleanArray[idx].value == this.pathname) {
                console.log("the right one was found, nothing to be done here");
            }
            else {
                if (this.booleanArray) {
                    this.booleanArray.forEach(function (bool) {
                        if (bool.value == value) {
                            console.log("inside the if/else loop, the value of bool : " + bool.true);
                            if (bool.true == true) {
                                console.log("inside the bool.true = true");
                                bool.true = false;
                            }
                            else {
                                console.log("inside the bool.true = false");
                                bool.true = true;
                            }
                        }
                        else {
                            console.log("new part added to booleanArray.");
                            var newValue = _this.interDebateChilds[idx];
                            _this.booleanArray.push({ value: newValue, idx: idx, true: true });
                        }
                    });
                }
            }
        }
        else {
            console.log("there ain't nothing inside the array.");
            this.booleanArray.push({ value: value, idx: idx, true: true });
        }
        console.log("after all things, the value of this.booleanArray[idx]: " + this.booleanArray[idx].true);
    };
    RedditApp.prototype.addInterDebateArticle = function (title, text) {
        var _this = this;
        var array = [];
        console.log("inside the addInterDebateArticle function, the values of the title,the text and the selected children: " + title.value, text.value, this.booleanArray);
        if (this.booleanArray) {
            this.booleanArray.forEach(function (content) {
                array.push(content);
                console.log("just before the creation of the new interpagedebate, the value of the booleanArray: ");
                console.log(_this.booleanArray);
            });
        }
        ;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: this.pathname, content: array, text: text.value, title: title.value, author: this.profile, authorRole: this.role });
        this._http.post("/newInterPageDebate", send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { console.log(data); }, function (err) { return console.log(err); }, function () { return console.log("the function of newInterPageDebate finsihed both on the server and client side"); });
    };
    ;
    RedditApp.prototype.allPostOptionsChange = function () {
        if (this.allPostOptions == false) {
            this.allPostOptions = true;
            this.articleButton = false;
            this.questionButton = false;
            this.interPageDebateButton = false;
            this.debateButton = false;
        }
        else {
            this.allPostOptions = false;
            this.articleButton = false;
            this.questionButton = false;
            this.interPageDebateButton = false;
            this.debateButton = false;
        }
        ;
    };
    ;
    RedditApp.prototype.changeDebateRadioValue = function () {
        if (this.loggedIn) {
            if (this.isMember || this.isAdmin) {
                if (this.debateButton == false) {
                    this.debateButton = true;
                    this.interPageDebateButton = false;
                    this.questionButton = false;
                    this.articleButton = false;
                }
            }
            else {
                this.radioNotMember = true;
            }
        }
        else {
            this.radioNotLoggedIn = true;
        }
    };
    ;
    RedditApp.prototype.changeInterPageDebateRadioValue = function () {
        if (this.loggedIn) {
            if (this.isMember || this.isAdmin) {
                if (this.interPageDebateButton == false) {
                    this.interPageDebateButton = true;
                    this.questionButton = false;
                    this.debateButton = false;
                    this.articleButton = false;
                }
            }
            else {
                this.radioNotMember = true;
            }
        }
        else {
            this.radioNotLoggedIn = true;
        }
    };
    ;
    RedditApp.prototype.changeArticleRadioValue = function () {
        if (this.loggedIn) {
            if (this.isMember || this.isAdmin) {
                if (this.articleButton == false) {
                    this.articleButton = true;
                    this.questionButton = false;
                    this.interPageDebateButton = false;
                    this.debateButton = false;
                }
            }
            else {
                this.radioNotMember = true;
            }
        }
        else {
            this.radioNotLoggedIn = true;
        }
    };
    ;
    RedditApp.prototype.changeQuestionRadioValue = function () {
        if (this.loggedIn) {
            if (this.isMember || this.isAdmin) {
                if (this.questionButton == false) {
                    this.questionButton = true;
                    this.articleButton = false;
                    this.interPageDebateButton = false;
                    this.debateButton = false;
                }
            }
            else {
                this.radioNotMember = true;
            }
        }
        else {
            this.radioNotLoggedIn = true;
        }
        ;
    };
    ;
    //Used to show the otherwise hidden form that allows the creation of a new sub to the current
    //one
    RedditApp.prototype.addNewSub = function () {
        this.addNewSubBoolean = true;
    };
    //submit the new sub to the server for it to be saved
    RedditApp.prototype.submitNewSub = function (name) {
        var _this = this;
        var user = this.profile;
        var parentName = this.pathname;
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        var send = JSON.stringify({ name: name.value, parentName: parentName, userName: this.profile });
        this._http.post('/createNewSub', send, { headers: headers })
            .map(function (res) {
            if (res.status = 200) {
                window.alert('subpage succesfully created');
                return res.json();
            }
            else {
                return res.json();
            }
        })
            .subscribe(function (data) { console.log(data); if (data.value = false) {
            _this.addNewSubBoolean = false;
        } /*To be tested to see if the "this" is correctly used*/ }, function (err) { return console.log(err); }, function () { console.log("the creation of the subpage is finsihed both on the client and the server"); });
    };
    RedditApp.prototype.dropdowner = function () {
        if (this.dropdownBoolean == false) {
            this.dropdown = "";
            console.log('%µ%£¨£%µ%¨£¨µ%£¨µ%£¨%µ£µ¨£µ%the dropdown: ' + this.dropdown);
            this.dropdownBoolean = true;
        }
        else if (this.dropdownBoolean == true) {
            this.dropdown = "hidden";
            this.dropdownBoolean = false;
        }
    };
    ;
    RedditApp.prototype.onFalseSubmit = function () {
        //pre:clicked on the button to create a new sub, but not logged in
        //post:alert message
        this.clickedOnSub = true;
    };
    RedditApp = __decorate([
        core_1.Component({
            selector: 'reddit',
            directives: [articlesArray, common_1.NgModel, InterDebateComponent, common_1.NgClass, ArticleComponent, DebateComponent, Radio, addrules_1.RedditRules, router_deprecated_1.RouterLink, common_1.NgFor, common_1.NgModel, radioQuestion, QuestionComponent, router_deprecated_1.ROUTER_DIRECTIVES],
            template: "\n  <div class=\"alert alert-warning\" *ngIf=\"warningWrongUrl\">\n  This Subpage does not exist, you will be redirected to the Main Page\n  </div>\n<!-- Modal -->\n<div *ngIf=\"modal==true\">\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Modal title</h4>\n      </div>\n      <div class=\"modal-body\">\n      <div class=\"control-group\" role=\"form\">\n      <div class=\"form-control\">\n      <label><input type=\"text\" let newmodaltext>your userName</label>\n      </div>\n      <div class=\"form-control\">\n      <textarea let newmodaltextarea></textarea>\n      </div>\n      <div class=\"form-control\">\n      <button class=\"btn btn-primary btn-sm\" (click)=\"onModalClick(newmodaltext.value,newmodaltextarea.value)\">submit</button>\n      </div>\n      </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>\n</div>\n\n\n\n\n\n  <div class=\"container-fluid\">\n      <div>\n  <h2>Welcome to the page of{{id}}</h2>\n  <div>\n  <ul class=\"list-group\">\n  \n  </ul>\n  </div>\n   </div>\n\n<!-- Showing the parents of the sub -->\n<div>\n<a href=\"http://localhost:3000/{{pathname}}\">{{pathname}}</a><p>/</p>\n<a *ngIf=\"parent1 != false\" href=\"http://localhost:3000/{{parent1}}\">{{parent1}}/</a>\n<a *ngIf=\"parent2 != false\" href=\"http://localhost:3000/{{parent2}}\">{{parent2}}/</a>\n<a *ngIf=\"parent3 != false\" href=\"http://localhost:3000/{{parent3}}\">{{parent3}}/</a>\n  \n    <div class=\"dropdown\" dropdown>\n        <button class=\"btn btn-primary\" (click)=\"dropdowner()\">My Heroes</button>\n        <ul class=\"{{dropdown}}\">\n            <li><a href=\"#\">Badman</a></li>\n<li *ngFor=\"let parent of arraytest;let idx = index\"><a href=\"http://localhost/3000/{{parent}}\">{{parent}}</a></li>\n        </ul>\n    </div>\n\n</div>\n\n  \n  <!-- adding a new debate -->\n  <!-- the ngif has been moved from the form group div, to be changed if necessary -->\n    <div class='container-fluid' *ngIf=\"debateButton\">\n  <div class=\"form-group\">\n    <form class=\"pull-left\" role=\"form\">\n        <div class=\"field\">\n          <label for=\"title\">Debate Title:</label>\n          <input name=\"title\"  #newdebatetitle class=\"inputdefault\">\n        </div>\n      <div>\n      <label for=\"text\">Text:</label>\n          <input name=\"text\"  #newdebatetext class=\"inputdefault\">\n      </div>\n       <button (click)=\"addDebateArticle(newdebatetitle, newdebatetext)\" class=\"btn btn-default\" >\n        Submit Debate\n      </button>\n      <label>Add a poll:</label><button (click)=\"addRadio()\">poll</button>\n      <div *ngIf=\"radioButton == true\">\n      <radio-question (questionEvent)=\"question($event.value)\"></radio-question>\n      <radio-component *ngFor=\"let radio of radios; let idx=index\" (change)=\"onChange($event.value,idx)\"></radio-component>\n      <button class=\"btn btn-primary\" (click)=\"addOption()\">new Radio</button>\n      </div>\n    </form>\n    </div>\n</div>\n\n<!-- adding a new sub -->\n<div class=\"container-fluid\" *ngIf=\"addNewSubBoolean\">\n<div class=\"form-group\">\n<form class=\"pull-left\" role=\"form\">\n<div class=\"field\">\n<label for=\"title\">The title of the sub:</label>\n<input type=\"text\" #newSubName class=\"inputdefault\">\n</div>\n<div class=\"field\">\n<button class=\"btn btn-primary\" id=\"small-button\" (click)=\"submitNewSub(newSubName)\">submit</button>\n\n<!-- perhaps add an option to choose the admins and/or moderators of the subpage -->\n    </div>\n    </form>\n</div>\n</div>\n</div>\n<!-- radio to choose the kind of post one wishes to create -->\n  <div clas=\"form-group\" *ngIf=\"allPostOptions\">\n  <form class=\"pull-left\" role=\"form\">\n  <div class=\"field\">\n  <label>debate</label><input type=\"radio\" name=\"type\" value=\"debate\" #debateRadio (click)=\"changeDebateRadioValue()\">\n  <label>interPageDebate</label> <input type=\"radio\" name=\"type\"  value=\"interPageDebate\" #interPageDebateRadio (click)=\"changeInterPageDebateRadioValue()\">\n  <label>article</label> <input type=\"radio\" name=\"type\"  value=\"article\" #articleRadio (click)=\"changeArticleRadioValue()\">\n  <label>question</label> <input type=\"radio\" name=\"type\"  value=\"question\" #questionRadio (click)=\"changeQuestionRadioValue()\">\n  <div class=\"alert alert-danger\" *ngIf=\"radioNotLoggedIn\">You need to be logged in to do that</div>\n  <div class=\"alert alert-danger\" *ngIf=\"radioNotMember\">You need to be a member of this sub to post here</div>\n  </div>\n  </form>\n  </div>\n\n<!-- creation of a new interPageDebate post -->\n  <div class='container-fluid'>\n  <div class=\"form-group\" *ngIf=\"interPageDebateButton\">\n    <form class=\"pull-left\" role=\"form\">\n        <div class=\"field\">\n          <label for=\"title\">Debate Title:</label>\n          <input name=\"title\"  #newinterdebatetitle class=\"inputdefault\">\n        </div> \n      <div>\n      <label for=\"text\">Text:</label>\n          <input name=\"text\"  #newinterdebatetext class=\"inputdefault\">\n      </div>\n       <button (click)=\"addInterDebateArticle(newinterdebatetitle, newinterdebatetext)\" class=\"btn btn-default\" >\n        Submit Debate</button>\n        <br>\n        <label>{{ subName }}</label>\n        <inter-debate-component [child]=\"child\" *ngFor=\"let interPage of interDebateChilds; let idx=index\"(interDebateInit)=\"interDebateInit(idx)\" (onDebateSelect)=\"onInterPageDebateSelect($event.value,idx)\"></inter-debate-component>\n\n    </form>\n    </div>\n</div>\n\n<!-- creation of a new question post -->\n\n<div class=\"form-group\" *ngIf=\"questionButton\">\n    <form class=\"pull-left\" role=\"form\">\n      <h3 class=\"ui header\">ask a Question</h3>\n        <div class=\"field\">\n          <label for=\"title\">Title:</label>\n          <input name=\"title\"  #newtitle class=\"inputdefault\">\n        </div>\n        <div class=\"field\">\n      </div>\n      <div>\n      <label for=\"text\">Text:</label>\n          <input name=\"text\"  #newtext class=\"inputdefault\">\n      </div>\n       <button (click)=\"addQuestion(newtitle, newtext)\" class=\"btn btn-default\" >\n        Submit link\n      </button>\n    </form>\n    </div>\n\n    <!-- creation of a new article post -->\n\n<div class=\"form-group\" *ngIf=\"articleButton\">\n    <form class=\"pull-left\" role=\"form\">\n      <h3 class=\"ui header\">Add a Link</h3>\n        <div class=\"field\">\n          <label for=\"title\">Title:</label>\n          <input name=\"title\"  #newtitle class=\"inputdefault\">\n        </div>\n        <div class=\"field\">\n          <label for=\"link\">Link:</label>\n          <input name=\"link\"  #newlink class=\"inputdefault\">\n      </div>\n      <div>\n      <label for=\"text\">Text:</label>\n          <input name=\"text\"  #newtext class=\"inputdefault\">\n      </div>\n       <button (click)=\"addArticle(newtitle, newlink, newtext)\" class=\"btn btn-default\" >\n        Submit link\n      </button>\n    </form>\n    </div>\n\n      <div class=\"col-md-1\" *ngIf=\"loggedIn\">\n             <button (click)=\"addNewSub()\" class=\"btn btn-default\" >\n        Create Sub\n      </button>\n      </div>\n      <div class=\"col-md-1\" *ngIf=\"loggedIn===false\">\n             <button class=\"btn btn-default\" (click)=\"onFalseSubmit()\">\n        Create Sub\n      </button>\n      <div class=\"alert alert-danger\" *ngIf=\"clickedOnSub\">You need to be logged in to do that</div>\n      </div>\n\n<!--Become an Officer button, to be deleted when needed or used again if necessary\n    <div class=\"col-md-1\">\n    <button class=\"btn btn-primary\" id=\"small-button\" (click)=\"newOfficer()\">Become an Officer</button>\n</div>\n-->\n             \n             <div class=\"col-md-1\">\n   <button class=\"btn btn-primary\" id=\"small-button\" (click)=newMember()>Become a Member</button>\n   <div *ngIf=\"newMemberNotloggedIn\" class=\"alert alert-danger\">You need to be logged in to do that</div>\n   <div *ngIf=\"alreadyMember\" class=\"alert alert-danger\">You are already a member of this subpage</div>\n   <div class=\"alert alert-danger\" *ngIf=\"alreadyBrotherUser\"></div>\n    </div> \n<!--\n <div class=\"col-md-1\">\n   <button [routerLink]=\"['../NewUser']\" class=\"btn btn-primary\" id=\"small-button\">Become a Member</button>\n    </div> -->\n<div class=\"col-md-3\">\n   <button class=\"btn btn-primary\" id=\"small-button\" (click)=\"newAdmin()\">become an Admin</button>\n    </div>\n\n\n     <div class=\"container-fluid\">\n    <div class=\"row\">\n    <div class=\"col-md-9\">\n    <div class=\"ui grid posts\"  id=\"custom-grid-posts\">\n    <articles-array [test]=\"test\" [idx]=\"idx\" *ngFor=\"let article of productionArray;let idx = index\" [array]=\"productionArray\"></articles-array>\n    <a class=\"btn btn-primary\" id=\"medium-button\" [routerLink]=\"['../Reddit',{id:pageCount}]\">next</a>\n    </div>\n        </div>\n    <div class=\"col-md-3\">\n    <p>test</p>\n    <div *ngIf=\"isAdmin\">\n   <button [routerLink]=\"['../AdminOptions']\" class=\"btn btn-primary btn-block\" id=\"small-button\">Admin Options</button>\n              <div *ngIf=\"role=='Admin'\"> \n<button [routerLink]=\"['../AdminPage']\" class=\"btn btn-primary btn-block\" id=\"small-button\">The Admin Page(dev)</button>\n</div>\n</div>\n           <!-- thing below to be replaced -->\n       <button href =\"http://localhost:3000/#/all/rules\" class=\"btn btn-primary btn-block\" id=\"medium-button\">The Rules</button>\n       <button [routerLink]=\"['../UserList']\" class=\"btn btn-primary btn-block\" id=\"medium-button\">List of the Members</button>\n           <button class=\"btn btn-primary btn-block\" id=\"big-button\" (click)=\"allPostOptionsChange()\">create a new Post</button>\n   \n    </div>\n      </div>\n         </div>\n\n\n\n    "
        }),
        __metadata("design:paramtypes", [router_deprecated_1.RouteParams, http_1.Http, router_deprecated_1.Router, common_1.Location])
    ], RedditApp);
    return RedditApp;
}());
exports.RedditApp = RedditApp;
;
//# sourceMappingURL=all.js.map