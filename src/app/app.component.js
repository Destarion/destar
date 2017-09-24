"use strict";
// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```
Object.defineProperty(exports, "__esModule", { value: true });
// *src/app/app.ts*
// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`
/*
 * Angular 2 decorators and services
 */
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var http_1 = require("@angular/http");
var app_service_1 = require("./app.service");
var allcomponent_1 = require("./allcomponent/allcomponent");
var conservative_1 = require("./conservative/conservative");
var router_active_directive_1 = require("./shared/directives/router-active/router-active.directive");
var home_1 = require("./home");
var angular2_jwt_1 = require("angular2-jwt");
// Import NgFor directive
var common_1 = require("@angular/common");
// Import Todo component
var todo_component_1 = require("./todo/todo.component");
// Import Recipes component
var recipes_component_1 = require("./recipes/recipes.component");
var App = (function () {
    // Pass in our application `state`
    // Alternative to using `redux`
    function App(appState, _http, location, _router) {
        this.appState = appState;
        this._http = _http;
        this.location = location;
        this._router = _router;
        //lock = new Auth0Lock('T1wdQrDposGW5BisaKViC0Cu9CuxtR0c', 'towfeek.eu.auth0.com');
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
        this.arrowHead = 'assets/img/8963.png';
        this.angularLogo = 'assets/img/angular-logo.png';
        this.name = 'Angular 2 MEAN Webpack Starter';
        this.url = 'https://twitter.com/datatype_void';
        this.registerChoice = true;
        this.loggedIn = false;
        this.successFailureModal = false;
        this.registerUsernameAlert = false;
        this.loginAlert = false;
        this.showLogin = true;
        this.canRegister = true;
        this.registerPasswordLength = true;
        this.correctLogin = true;
        this.pathName = location.prepareExternalUrl(location.path());
        console.log("the appcomponent pathname: " + this.pathName);
    }
    App.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Initial App State', this.appState.state);
        //we check if the user is logged in already, in wich case there is no 
        //need to have the login or register option, only an option to logout.
        //create a variable (boolean) that check specifically which one of the options should
        //be choosen.
        var headers = new http_1.Headers();
        headers.append('content-type', 'application/json');
        var sent = JSON.stringify({ text: "dummy" });
        this._http.post("/isLoggedIn", sent, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("start of the isLoggedIn data");
            if (data.a) {
                _this.showLogin = false;
                console.log("isloggedin");
            }
            else if (data.a == false) {
                _this.showLogin = true;
                console.log("is not logged in");
                _this.loggedIn = true;
            }
        }, function (err) { return console.log(err); }, function () { return console.log("finsihed the isLoggedIn both on the client and the server side"); });
    };
    //The new register stuff 
    App.prototype.registerFocusPasswordOut = function (registerPassword) {
        var password = registerPassword.value;
        console.log("the password length: " + password.length);
        if (password.length < 7) {
            console.log('paswword length smaller');
            this.registerPasswordLength = false;
            this.canRegister = false;
        }
        else {
            this.registerPasswordLength = true;
            this.canRegister = true;
        }
    };
    App.prototype.onRegisterFormSubmit = function (username, password, modal) {
        //pre:username,password
        //post:user registererd in mongodb database
        var _this = this;
        //Do not forget to have the already registered usernames not be registered again, and
        //send an error message instead
        //!!! iii for today:1 Make sure the redirect system for login and register
        //AND the error systeme for the login work correctly
        //2 the register must make sure that the user is not already existent
        //(use the already existent registerAlert)
        //!!! iii
        var username = username.value;
        var password = password.value;
        if (password.length < 7) {
            this.registerPasswordLength = false;
            this.canRegister = false;
        }
        else {
            var send = JSON.stringify({ username: username, password: password, url: this.pathName });
            var headers = new http_1.Headers;
            headers.append('Content-Type', 'application/json');
            this._http.post('/Register', send, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.a === true) {
                    _this._router.navigate(['./All']);
                }
                ;
                if (data.uniqueUser == false) {
                    _this.registerUsernameAlert = true;
                }
                else {
                    _this.registerUsernameAlert = false;
                }
            }, function (err) { return console.log(err); }, function () { return console.log("login finished both on the client and server side"); });
        }
    };
    ;
    //The new login stuff 
    App.prototype.onLoginFormSubmit = function (username, password, modal) {
        var _this = this;
        console.log('the modal: ' + modal);
        var username = username.value;
        var password = password.value;
        console.log("onLoginFormSubmit, the typeof and the values of the username and password: " + typeof username, typeof password, username, password);
        var send = JSON.stringify({ username: username, password: password, url: this.pathName });
        var headers = new http_1.Headers;
        headers.append('Content-Type', 'application/json');
        this._http.post('/Login', send, { headers: headers })
            .map(function (res) { /* if(res.status !== 200){this.loggedIn = false;this.loginAlert=true}else{ this.loginAlert=false;*/ return res.json(); /*}*/ })
            .subscribe(function (data) {
            if (data.correctUsername === false) {
                _this.correctLogin = false;
            }
            if (data.a === true) {
                _this._router.navigate(['./All']);
                _this.showLogin = false;
            }
            ;
            /*console.log("the login is finished and the subscription has started, the data.a: ");
          if(data.a===true){
            console.log("in the if=true")
          }
          this.loggedIn=true;
           console.log(this.loggedIn);*/
        }, function (err) { return console.log(err); }, function () { return console.log("login finished both on the client and server side"); });
    };
    ;
    App.prototype.registerOrLogin = function () {
        //pre:nothing
        //post:changes wether the login or the register form are to be shown
        if (this.registerChoice == true) {
            this.registerChoice = false;
        }
        else {
            this.registerChoice = true;
        }
        ;
    };
    ;
    App.prototype.onLogout = function () {
        var _this = this;
        var headers = new http_1.Headers;
        headers.append("Content-Type", 'application/json');
        var send = JSON.stringify({ name: "a" });
        this._http.post("/Logout", send, { headers: headers }).map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.a === true) {
                _this.showLogin = true;
            }
        }, function (err) { return console.log(err); }, function () { });
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            providers: [],
            directives: [todo_component_1.Todo,
                common_1.NgFor,
                router_active_directive_1.RouterActive],
            encapsulation: core_1.ViewEncapsulation.None,
            pipes: [],
            // Load our main `Sass` file into our `app` `component`
            styleUrls: [require('!style!css!sass!../sass/main.scss')],
            template: "\n    <md-content>\n      <md-toolbar color=\"primary\">\n          <span>{{ name }}</span>\n          <span class=\"fill\"></span>\n         \n      </md-toolbar>\n\n      <md-progress-bar mode=\"indeterminate\" color=\"primary\" *ngIf=\"loading\">\n      </md-progress-bar>\n\n\n\n\n<!-- new modal login and register form -->\n<div class=\"container\">\n\n<a *ngIf=\"showLogin\" href=\"\" data-toggle=\"modal\" data-target=\"#login-modal\">login/register</a>\n<a *ngIf=\"showLogin===false\" href=\"javascript:;\" (click)='onLogout()'>logout</a>\n\n<div class=\"modal fade\" id=\"login-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" >\n    \t  <div class=\"modal-dialog\">\n\t\t\t\t<div class=\"modal-container\">\n\n          <div *ngIf=\"registerChoice == false\">\n          <h1>Login: </h1><br>\n<form>\n  <div class=\"form-group\">\n    <label for=\"username\">Username:</label>\n    <input type=\"username\" class=\"form-control\" id=\"loginUsername\" #loginUsername>\n    <div class=\"alert alert-danger\" *ngIf=\"correctLogin===false\">Incorrect username or password</div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"password\">Password:</label>\n    <input type=\"password\" class=\"form-control\" id=\"loginPassword\" #loginPassword>\n    <div class=\"alert alert-danger\" *ngIf=\"loginAlert\">Username or Password are incorrect</div>\n  </div>\n  <button type=\"submit\" class=\"btn btn-default\" (click)=\"onLoginFormSubmit(loginUsername,loginPassword,modal)\">Submit</button>\n</form>\n</div>\n\t\t\t\t\t\n             \n             <div *ngIf=\"registerChoice\">\n             <h1>Register: </h1><br>\n<form>\n  <div class=\"form-group\">\n    <label for=\"username\">Username:</label>\n    <input type=\"username\" class=\"form-control\" id=\"registerUsername\" #registerUsername>\n    <div class=\"alert alert-danger\" *ngIf=\"registerUsernameAlert\"><p>Username already exists</p></div>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"password\">Password:</label>\n    <input type=\"password\" class=\"form-control\" id=\"registerPassword\" #registerPassword (focusout)=\"registerFocusPasswordOut(registerPassword)\">\n    <div class=\"alert alert-danger\" *ngIf=\"registerPasswordLength===false\">The password should contain at least 7 characters</div>\n  </div>\n  <div *ngIf=\"canRegister\">\n  <button type=\"submit\" class=\"btn btn-default\" (click)=\"onRegisterFormSubmit(registerUsername,registerPassword,modal)\">Submit</button>\n  </div>\n  <div *ngIf=\"canRegister===false\">\n  <button class=\"btn btn-default\">Submit</button>\n  </div>\n</form>\n\n  </div>\n</div>\n\n\n\n\t\t\t\t  <div class=\"login-help\">\n          <div *ngIf=\"registerChoice\">\n\t\t\t\t\t<button class=\"btn btn-primary\" id=\"small-button\" (click)=\"registerOrLogin()\">login</button>\n\t\t\t\t  </div>\n                    <div *ngIf=\"registerChoice == false\">\n\t\t\t\t\t<button class=\"btn btn-primary\" id=\"small-button\" (click)=\"registerOrLogin()\">register</button>\n\t\t\t\t  </div>\n          </div>\n\t\t\t\t</div>\n\t\t\t</div>\n        </div>\n\n      <router-outlet></router-outlet>\n\n      <pre class=\"app-state\">this.appState.state = {{ appState.state | json }}</pre>\n\n      <footer>\n        <img [src]=\"angularLogo\" width=\"7%\">\n        Angular 2 MEAN Webpack Starter by <a [href]=\"url\">@datatype_void</a>\n      </footer>\n    </md-content>\n\n\n  "
        })
        //DO NOT FORGET TO ADD A FEATURE TO RETREIVE A LOST PASSWORD
        //I HAVE TO KNOW HOW TO USE SESSIONS TO ACCESS IF A USER IS LOGGED IN OR NOT
        ,
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'Common', component: conservative_1.Conservative, useAsDefault: true },
            { path: '/all/...', name: 'All', component: allcomponent_1.AllComponent },
            { path: '/conservative', name: 'Conservative', component: conservative_1.Conservative },
            { path: '/home', name: 'Home', component: home_1.Home },
            { path: '/todo', component: todo_component_1.Todo, name: 'Todo' },
            { path: '/redux', component: recipes_component_1.Recipes, name: 'Recipes' },
            // Async load a component using Webpack's require with
            // es6-promise-loader and webpack `require`
            { path: '/about', name: 'About', loader: function () { return require('es6-promise!./about')('About'); } },
        ]),
        __metadata("design:paramtypes", [app_service_1.AppState, http_1.Http, common_1.Location, router_deprecated_1.Router])
    ], App);
    return App;
}());
exports.App = App;
;
/*
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
//# sourceMappingURL=app.component.js.map