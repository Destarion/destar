"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("../app.service");
var title_1 = require("./services/title");
var x_large_1 = require("./directives/x-large");
var accordion_component_1 = require("../shared/components/accordion/accordion.component");
var accordion_group_component_1 = require("../shared/components/accordion/accordion-group.component");
// Import NgFor directive
var common_1 = require("@angular/common");
var Home = (function () {
    // TypeScript public modifiers
    function Home(appState, title) {
        this.appState = appState;
        this.title = title;
        // Set our default values
        this.localState = { value: '' };
        this.isOpen = false;
        this.groups = [
            {
                heading: 'Dynamic 1',
                content: 'I am dynamic!'
            },
            {
                heading: 'Dynamic 2',
                content: 'Dynamic as well'
            }
        ];
    }
    Home.prototype.removeDynamic = function () {
        this.groups.pop();
    };
    Home.prototype.ngOnInit = function () {
        console.log('hello `Home` component');
        // this.title.getData().subscribe(data => this.data = data);
    };
    Home.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    Home = __decorate([
        core_1.Component({
            // The selector is what angular internally uses
            // for `document.querySelectorAll(selector)` in our index.html
            // where, in this case, selector is the string 'home'
            selector: 'home',
            // We need to tell Angular's Dependency Injection which providers are in our app.
            providers: [
                title_1.Title
            ],
            // We need to tell Angular's compiler which directives are in our template.
            // Doing so will allow Angular to attach our behavior to an element
            directives: [
                x_large_1.XLarge,
                accordion_component_1.Accordion,
                accordion_group_component_1.AccordionGroup,
                common_1.NgFor
            ],
            // We need to tell Angular's compiler which custom pipes are in our template.
            pipes: [],
            // Our list of styles in our component. We may add more to compose many styles together
            styles: [require('./home.css')],
            // Every Angular template is first compiled by the browser before Angular runs it's compiler
            template: require('./home.html')
        }),
        __metadata("design:paramtypes", [app_service_1.AppState, title_1.Title])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.component.js.map