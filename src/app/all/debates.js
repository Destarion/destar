"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
var common_1 = require("@angular/common");
require("rxjs/operator");
//RADIO STUFF IS TO BE FOUND here
var radioAnswers = (function () {
    function radioAnswers(_http, _routeParams) {
        this._http = _http;
        this._routeParams = _routeParams;
        this.id = this._routeParams.get("id");
        this.gatherStuff = new core_1.EventEmitter();
        this.votes = 3;
        this.chosen = false;
    }
    radioAnswers.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: 'all', id: this.id });
        this._http.post('/initPollVotes', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.gatherStuff.emit({ idx: _this.idx, pollVotes: data.pollVotes, answers: data.answers });
        });
        //Continue here, this fetches the answer and vote with the idx we give the parent Component
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], radioAnswers.prototype, "gatherStuff", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], radioAnswers.prototype, "votes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], radioAnswers.prototype, "idx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], radioAnswers.prototype, "answerDisplay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], radioAnswers.prototype, "chosen", void 0);
    radioAnswers = __decorate([
        core_1.Component({
            selector: "radio-answers",
            template: "\n    <h4>{{ answerDisplay }}:{{ votes }}</h4><br />\n    "
        }),
        __metadata("design:paramtypes", [http_1.Http, router_deprecated_1.RouteParams])
    ], radioAnswers);
    return radioAnswers;
}());
var radioChoices = (function () {
    function radioChoices(_http, _routeParams) {
        this._http = _http;
        this._routeParams = _routeParams;
        this.changeIdx = new core_1.EventEmitter();
        this.change = new core_1.EventEmitter();
        this.idx = -1;
        this.controllIdx = -1;
    }
    radioChoices.prototype.ngOnInit = function () {
        console.log(this.answer);
        this.answer = this.answer.value;
    };
    radioChoices.prototype.check = function () {
        this.change.emit({ idx: this.idx });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], radioChoices.prototype, "changeIdx", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], radioChoices.prototype, "change", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], radioChoices.prototype, "idx", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], radioChoices.prototype, "answer", void 0);
    radioChoices = __decorate([
        core_1.Component({
            selector: "radio-choices",
            template: "\n    <label>{{ answer }}</label>\n    <button class=\"btn btn-secondary\" (click)=\"check()\">choose</button><br />\n    \n    "
        }),
        __metadata("design:paramtypes", [http_1.Http, router_deprecated_1.RouteParams])
    ], radioChoices);
    return radioChoices;
}());
//END OF RADIO STUFF
var Debate = (function () {
    function Debate(author, content) {
        this.author = author;
        this.content = content;
    }
    return Debate;
}());
var DebateComponent = (function () {
    function DebateComponent() {
    }
    DebateComponent = __decorate([
        core_1.Component({
            selector: 'reddit-debate',
            inputs: ['debate'],
            host: {
                class: 'row'
            },
            template: "\n    <div class='container'>\n    <div class='panel panel-default'>\n    <div class='panel-body'>\n    <div class='row-fluid'>\n    {{debate.author}}\n    </div>\n    <div class='row-fluid'>\n    {{debate.content}}\n    </div>\n    </div>\n    </div>\n    </div>\n    "
        })
    ], DebateComponent);
    return DebateComponent;
}());
var addDebateComments = (function () {
    function addDebateComments(_http, _routeParams) {
        this._http = _http;
        this._routeParams = _routeParams;
        this.loginAlert = false;
        this.one = 1;
        this.chosen = false;
        this.isLoggedIn = false;
        this.id = this._routeParams.get("id");
        var cut = this.id.indexOf(" ");
        this.subName = this.id.substring(0, cut);
        this.articlesId = this.id.substring(cut + 1);
        this.debatePoll = false;
        this.debates = [];
    }
    addDebateComments.prototype.ngOnInit = function () {
        var _this = this;
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
            }
            else if (data.isAuthenticated === true) {
                _this.isLoggedIn = true;
                _this.userName = data.userName;
                console.log(data.userName);
            }
        }, function (err) { return console.log(err); }, function () { return console.log("the initiation of the comment pages user is finished"); });
        //pre:username, subName, articles Id
        //post:debate comments retrieved and displayed,question and answer choices initialized
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var send = JSON.stringify({ subName: this.subName, articlesId: this.articlesId, userName: this.userName });
        console.log("before sending, the subname: " + this.subName);
        this._http.post('/debateCommentInit', send, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            //Check if the user has already voted
            /*var stringVote = JSON.stringify(data.voted)
            var parsedVote = JSON.parse(stringVote);
           data.voted.forEach((user)=>{
               console.log('!!inside the forEach')
               if(user = 'raphael.baudeu@gmail.com'){
                   console.log('user found : '+user)
                   this.chosen = true;
               }
               console.log('after the init the value of this.chosen is : '+this.chosen)
           })
           //load the answers and put them inside the radios array
           this.answers = JSON.parse(data.answers);
           //load the votes
           if(data.votes !== undefined && data.votes !== null){
            this.pollVotes = data.votes;
           }else{console.log('There are no votes')};
           //load the question
           if(data.question !==undefined && data.question!==null){this.debatePoll = true;this.question = data.question;console.log('The debatePoll value : '+this.debatePoll)}else{console.log('question = null or undefined')}
           //load the debate Comments.
           console.log('The data will be shown here')*/
            data.array.forEach(function (debate) {
                var content = debate.content;
                var author = debate.author;
                _this.debates.push(new Debate(author, content));
            });
        }, function (err) { return console.log(err); }, function () { return console.log('The Debate Comment section was succesfully initialized'); });
    };
    addDebateComments.prototype.addDebateComment = function (input) {
        console.log('adding Debate comments started');
        var profile = this.profile;
        var send = JSON.stringify({ data: input.value, subName: this.subName, articlesid: this.articlesId, profile: this.userName });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post('/debates', send, { headers: headers
        })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
    };
    addDebateComments.prototype.onChange = function (idx) {
        var _this = this;
        //MUCH BETTER and angulary solution to be found for the checking
        console.log('before : ' + this.chosen);
        if (this.chosen === true) {
            window.alert('You have already chosen');
        }
        else {
            console.log('while pressing, the value of this.chosen is : ' + this.chosen);
            //MUCH BETTER and angulary solution to be found for the checking      
            //Checks if the user has already voted, and if not, adds him to the list of people who have voted  
            if (this.chosen === true) {
                window.alert('You have already chosen');
            }
            else {
                var headers = new http_1.Headers();
                headers.append('Content-Type', 'application/json');
                var subName = "all";
                var id = this.id;
                var send = JSON.stringify({ userName: 'raphael.baudeu@gmail.com', subName: subName, id: id });
                this._http.post('/debateChosen', send, { headers: headers })
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) { console.log('sucess? : ' + data); _this.chosen = true; }, function (err) { return console.log(err); }, function () { return console.log('process finished'); });
            }
            console.log('after : ' + this.chosen);
            console.log('idx: ' + idx);
            var headers = new http_1.Headers();
            var subName = 'all';
            var id = this.id;
            headers.append('Content-Type', 'application/json');
            var send = JSON.stringify({ idx: idx, subName: subName, id: id });
            this._http.post('/pollVotes', send, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.stringed = JSON.stringify(data);
                _this.parsed = JSON.parse(_this.stringed);
                console.log('data pollVotes : ' + data);
                console.log('pollVotes, pollVotes.length : ' + JSON.stringify(_this.pollVotes), JSON.stringify(_this.pollVotes.length));
                _this.parsed.forEach(function (vote) {
                    console.log('el votes : ' + vote.votes);
                    if (vote.idx = idx) {
                        vote.votes += _this.one;
                    }
                });
                _this.pollVotes = _this.parsed;
                console.log('before this.parsed : ' + _this.parsed);
                console.log(_this.pollVotes);
            }, function (err) { return console.log(err); }, function () { return console.log('finished'); });
        }
    };
    addDebateComments.prototype.onIdx = function (idx) {
    };
    addDebateComments.prototype.sendAnswers = function (idx, pollVotes, answers) {
        var _this = this;
        console.log('answers : ' + answers);
        console.log('sendAnswers start');
        var stringed = JSON.stringify(pollVotes);
        var parsed = JSON.parse(stringed);
        console.log('this.parsed : ' + this.parsed);
        this.answers.forEach(function (answer) {
            if (answer.idx == idx) {
                console.log('right idx for answers found');
                console.log('answer value : ' + answer.value);
                _this.answerDisplay = answer.value;
                console.log('------------------------------------------');
                console.log('after answerDisplay : ' + _this.answerDisplay);
                console.log('------------------------------------------');
            }
            else {
                console.log('There was an error in the fetching of the right answer');
            }
            ;
        });
        this.pollVotes.forEach(function (vote) {
            if (vote.idx == idx) {
                console.log('pollVote idx was found');
                _this.votes = vote.votes;
                console.log('this.votes : ' + _this.votes);
            }
        });
        var answerString = JSON.stringify(answers);
        answers.forEach(function (el, index) {
            console.log('element : ' + el.value);
            if (el.idx = idx) {
                _this.answer = el.value;
                console.log('el.value : ' + el.value);
            }
        });
        this.parsed = parsed;
        console.log('forEach answers finished');
    };
    addDebateComments.prototype.submitNotLoggedIn = function () {
        //pre:clicked on submit but not logged in
        //post:displays message saying that you need to be logged in to do this
        this.loginAlert = true;
    };
    addDebateComments = __decorate([
        core_1.Component({
            selector: 'add-debate',
            directives: [DebateComponent, router_deprecated_1.RouterLink, common_1.NgFor, radioChoices, radioAnswers],
            template: "\n    <div class=\"container\">\n    <div *ngIf=\"debatePoll === true\">\n    <h3>Poll:{{ question }}</h3>\n    <radio-choices [chosen]=\"chosen\" [answer]=\"answer\" [idx]=\"idx\" *ngFor=\"let answer of answers;let idx = index\" (change)=\"onChange(idx)\" (changeIdx)=\"onIdx($event.value)\"></radio-choices>\n    </div>\n    </div>\n    <div class='container'>\n    <div class='form'>\n    <form role='form'>\n    <textarea name='text' #newtext></textarea>\n    <button *ngIf=\"isLoggedIn\" class=\"btn btn-primary\" (click)=\"addDebateComment(newtext)\">submit</button>\n    <button *ngIf=\"isLoggedIn===false\" class=\"btn btn-primary\" (click)=\"submitNotLoggedIn()\">submit</button>\n    <div *ngIf=\"loginAlert\" class=\"alert alert-danger\">You need to be logged in to do that</div>\n    </form>\n    </div>\n    </div>\n    <div class=\"container\">\n    <div class=\"ui grid post\">\n    <div *ngIf=\"chosen === true\">\n    <radio-answers [answerDisplay]=\"answerDisplay\" [idx]=\"idx\" *ngFor=\"let answer of answers;let idx = index\" [votes]=\"votes\" (gatherStuff)=\"sendAnswers($event.idx,$event.pollVotes,$event.answers)\"></radio-answers>\n    <reddit-debate *ngFor='#debate of debates' [debate] = 'debate'>\n    </reddit-debate>\n    </div>\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [http_1.Http, router_deprecated_1.RouteParams])
    ], addDebateComments);
    return addDebateComments;
}());
exports.addDebateComments = addDebateComments;
//# sourceMappingURL=debates.js.map