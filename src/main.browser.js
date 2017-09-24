"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# Providers provided by Angular
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var angular2_jwt_1 = require("angular2-jwt");
//## Platform and Environment
//
//** our providers/directives/pipes **
var browser_1 = require("./platform/browser");
var environment_1 = require("./platform/environment");
var http_1 = require("@angular/http");
//## App Component
//
//** our top level component that holds all of our components **
var app_1 = require("./app");
// Bootstrap our Angular app with a top level component `App` and inject
// our Services and Providers into Angular's dependency injection
function main(initialHmrState) {
    return platform_browser_dynamic_1.bootstrap(app_1.App, [
        http_1.HTTP_PROVIDERS
    ].concat(browser_1.PROVIDERS, environment_1.ENV_PROVIDERS, browser_1.DIRECTIVES, browser_1.PIPES, app_1.APP_PROVIDERS, app_1.APP_STORES, [
        core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
        //provide(AuthConfig, { useFactory: () => {
        // return new AuthConfig();
        //}
        //}
        //),
        angular2_jwt_1.AuthHttp
    ]))
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
//## Vendors
//
// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// You can also import them in vendors to ensure that they are bundled in one file
// Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
//## Hot Module Reload
//
// experimental version
if ('development' === ENV && HMR === true) {
    // activate hot module reload
    var ngHmr = require('angular2-hmr');
    ngHmr.hotModuleReplacement(main, module);
}
else {
    // bootstrap when documetn is ready
    document.addEventListener('DOMContentLoaded', function () { return main(); });
}
//# sourceMappingURL=main.browser.js.map