"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var Profile = (function () {
    function Profile(authHttp) {
        this.authHttp = authHttp;
    }
    Profile.prototype.ngOnInit = function () {
        console.log('ngOnInit() called');
        this.profile = JSON.parse(localStorage.getItem('profile'));
        this.getSecretThing();
    };
    Profile.prototype.ngOnDestroy = function () {
        console.log('ngOnDestroy() called');
    };
    Profile.prototype.ngAfterContentInit = function () {
        console.log('ngAfterContentInit() called');
    };
    Profile.prototype.getSecretThing = function () {
        var _this = this;
        this.authHttp.get('http://localhost:3002/api/quote')
            .subscribe(function (data) {
            console.log(data.json());
            _this.quote = data.json();
        }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
    };
    Profile = __decorate([
        core_1.Component({
            selector: 'profile',
            template: "\n\t <img src=\"{{profile.picture}}\" style=\"width: 50px\" /> {{profile.name}}    \n   <h2>Chuck quote of the day</h2>\n   {{quote}}\n\t"
        })
        // @CanActivate(() => tokenNotExpired())
        ,
        __metadata("design:paramtypes", [angular2_jwt_1.AuthHttp])
    ], Profile);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map