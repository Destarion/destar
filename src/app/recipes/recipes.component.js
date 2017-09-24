"use strict";
// ```
// recipes.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// recipes.component.js may be freely distributed under the MIT license
// ```
Object.defineProperty(exports, "__esModule", { value: true });
// # Recipes Component
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var recipe_service_1 = require("./recipe.service");
var recipe_details_component_1 = require("./recipe-details.component");
var recipe_list_component_1 = require("./recipe-list.component");
var Recipes = (function () {
    function Recipes(recipeService, store) {
        this.recipeService = recipeService;
        this.store = store;
        // Bind to the `recipes` observable on `RecipeService`
        this.recipes = recipeService.recipes;
        // Bind the `selectedRecipe` observable from the store
        this.selectedRecipe = store.select('selectedRecipe');
        // DEBUG
        this.selectedRecipe.subscribe(function (v) { return console.log(v); });
        // `recipeService.loadRecipes` dispatches the `ADD_RECIPES` event
        // to our store which in turn updates the `recipes` collection
        recipeService.loadRecipes();
    }
    Recipes.prototype.selectRecipe = function (recipe) {
        this.store.dispatch({
            type: 'SELECT_RECIPE',
            payload: recipe
        });
    };
    Recipes.prototype.deleteRecipe = function (recipe) {
        this.recipeService.deleteRecipe(recipe);
    };
    Recipes.prototype.resetRecipe = function () {
        var emptyRecipe = {
            _id: null,
            tags: [],
            title: '',
            description: '',
            rating: null,
            creator: '',
            ingredients: [],
            directions: []
        };
        this.store.dispatch({
            type: 'SELECT_RECIPE',
            payload: emptyRecipe
        });
    };
    Recipes.prototype.saveRecipe = function (recipe) {
        this.recipeService.saveRecipe(recipe);
        this.resetRecipe();
    };
    Recipes = __decorate([
        core_1.Component({
            selector: 'recipes',
            providers: [],
            template: require('./recipes.html'),
            directives: [recipe_list_component_1.RecipeList, recipe_details_component_1.RecipeDetails],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [recipe_service_1.RecipeService,
            store_1.Store])
    ], Recipes);
    return Recipes;
}());
exports.Recipes = Recipes;
//# sourceMappingURL=recipes.component.js.map