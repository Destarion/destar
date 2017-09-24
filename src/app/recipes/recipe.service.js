"use strict";
// ```
// recipe.service.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipe.service.js may be freely distributed under the MIT license
// ```
Object.defineProperty(exports, "__esModule", { value: true });
// # Recipe Service
var http_1 = require("@angular/http");
var store_1 = require("@ngrx/store");
var core_1 = require("@angular/core");
var HEADER = {
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
};
var RecipeService = (function () {
    // Inject the `AppStore` into the constructor with a type of `AppStore`
    function RecipeService(http, store) {
        this.http = http;
        this.store = store;
        // Bind an observable of our `recipes` to `RecipeService`
        // Since this is essentially a `key, value` system, we can
        // set our `recipes` by calling `store.select('recipes')`
        this.recipes = store.select('recipes');
    }
    RecipeService.prototype.loadRecipes = function () {
        var _this = this;
        this.http.get('/api/recipe')
            .map(function (res) { return res.json(); })
            .map(function (payload) { return ({ type: 'ADD_RECIPES', payload: payload }); })
            .subscribe(function (action) { return _this.store.dispatch(action); });
    };
    RecipeService.prototype.saveRecipe = function (recipe) {
        (recipe._id) ? this.updateRecipe(recipe) : this.createRecipe(recipe);
    };
    RecipeService.prototype.createRecipe = function (recipe) {
        var _this = this;
        this.http.post('/api/recipe', JSON.stringify(recipe), HEADER)
            .map(function (res) { return res.json(); })
            .map(function (payload) { return ({ type: 'CREATE_RECIPE', payload: payload }); })
            .subscribe(function (action) { return _this.store.dispatch(action); });
    };
    RecipeService.prototype.updateRecipe = function (recipe) {
        var _this = this;
        this.http.put("/api/recipe/" + recipe._id, JSON.stringify(recipe), HEADER)
            .subscribe(function (action) { return _this.store.dispatch({ type: 'UPDATE_RECIPE', payload: recipe }); });
    };
    RecipeService.prototype.deleteRecipe = function (recipe) {
        var _this = this;
        this.http.delete("/api/recipe/" + recipe._id)
            .subscribe(function (action) { return _this.store.dispatch({ type: 'DELETE_RECIPE', payload: recipe }); });
    };
    RecipeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, store_1.Store])
    ], RecipeService);
    return RecipeService;
}());
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map