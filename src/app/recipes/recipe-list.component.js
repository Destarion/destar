"use strict";
// ```
// recipe-list.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe-list.component.js may be freely distributed under the MIT license
// ```
Object.defineProperty(exports, "__esModule", { value: true });
// # Recipe List
var core_1 = require("@angular/core");
var rating_component_1 = require("./rating.component");
var RecipeList = (function () {
    function RecipeList() {
        // Two event outputs for when a recipe is selected or deleted
        this.selected = new core_1.EventEmitter();
        this.deleted = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], RecipeList.prototype, "recipes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RecipeList.prototype, "selected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RecipeList.prototype, "deleted", void 0);
    RecipeList = __decorate([
        core_1.Component({
            selector: 'recipe-list',
            template: require('./recipe-list.html'),
            directives: [rating_component_1.Rating]
        })
    ], RecipeList);
    return RecipeList;
}());
exports.RecipeList = RecipeList;
//# sourceMappingURL=recipe-list.component.js.map