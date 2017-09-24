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
var rating_component_1 = require("./rating.component");
var RecipeDetails = (function () {
    function RecipeDetails() {
        // Allow the user to save/delete a `recipe or cancel the
        // operation. Flow events up from here.
        this.saved = new core_1.EventEmitter();
        this.cancelled = new core_1.EventEmitter();
    }
    Object.defineProperty(RecipeDetails.prototype, "_recipe", {
        // Assign our `recipe` to a locally scoped property
        // Perform additional logic on every update via ES6 setter
        // Create a copy of `_recipe` and assign it to `this.selectedRecipe`
        // which we will use to bind our form to
        set: function (value) {
            if (value)
                this.originalTitle = value.title;
            this.selectedRecipe = Object.assign({}, value);
            // DEBUG
            console.log('this.selectedRecipe: ');
            console.log(this.selectedRecipe);
        },
        enumerable: true,
        configurable: true
    });
    // Whenever the user needs to add a new `tag`, push an
    // empty `tag` object to the `tags` array on the
    // `selectedRecipe`
    RecipeDetails.prototype.newTag = function () {
        // blank `tag` object
        var tag = {
            name: ''
        };
        // Check to see if the `tags` array exists before
        // attempting to push a `tag` to it
        if (!this.selectedRecipe.tags)
            this.selectedRecipe.tags = [];
        this.selectedRecipe.tags.push(tag);
    };
    // Whenever the user needs to add a new `ingredient`, push an
    // empty `ingredient` object to the `ingredient` array on the
    // `selectedRecipe`
    RecipeDetails.prototype.newIngredient = function () {
        // blank `ingredient` object
        var ingredient = {
            amount: '',
            unit: '',
            name: ''
        };
        // Check to see if the `ingredients` array exists before
        // attempting to push an `ingredient` to it
        if (!this.selectedRecipe.ingredients)
            this.selectedRecipe.ingredients = [];
        this.selectedRecipe.ingredients.push(ingredient);
    };
    // Whenever the user needs to add a new `direction`, push an
    // empty `direction` object to the `direction` array on the
    // `selectedRecipe`
    RecipeDetails.prototype.newDirection = function () {
        // blank `direction` object
        var direction = {
            step: ''
        };
        // Check to see if the `directions` array exists before
        // attempting to push a `direction` to it
        if (!this.selectedRecipe.directions)
            this.selectedRecipe.directions = [];
        this.selectedRecipe.directions.push(direction);
    };
    RecipeDetails.prototype.onUpdate = function (value) {
        // Set the value of the selected recipe's rating to the
        // value passed up from the `rating` component
        this.selectedRecipe.rating = value;
    };
    RecipeDetails.prototype.deleteTag = function (tag) {
        // loop through all of the `tags` in the `selectedRecipe`
        for (var i = 0; i < this.selectedRecipe.tags.length; i++) {
            // if the `tag` at the current index matches that of the one
            // the user is trying to delete
            if (this.selectedRecipe.tags[i] === tag) {
                // delete the `tag` at the current index
                this.selectedRecipe.tags.splice(i, 1);
            }
        }
    };
    RecipeDetails.prototype.deleteIngredient = function (ingredient) {
        // loop through all of the `ingredients` in the `selectedRecipe`
        for (var i = 0; i < this.selectedRecipe.ingredients.length; i++) {
            // if the `ingredient` at the current index matches that of the one
            // the user is trying to delete
            if (this.selectedRecipe.ingredients[i] === ingredient) {
                // delete the `ingredient` at the current index
                this.selectedRecipe.ingredients.splice(i, 1);
            }
        }
    };
    RecipeDetails.prototype.deleteDirection = function (step) {
        // loop through all of the `directions` in the `selectedRecipe`
        for (var i = 0; i < this.selectedRecipe.directions.length; i++) {
            // if the `direction` at the current index matches that of the one
            // the user is trying to delete
            if (this.selectedRecipe.directions[i] === step) {
                // delete the `direction` at the current index
                this.selectedRecipe.directions.splice(i, 1);
            }
        }
    };
    __decorate([
        core_1.Input('recipe'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], RecipeDetails.prototype, "_recipe", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RecipeDetails.prototype, "saved", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RecipeDetails.prototype, "cancelled", void 0);
    RecipeDetails = __decorate([
        core_1.Component({
            selector: 'recipe-detail',
            template: require('./recipe-details.html'),
            directives: [rating_component_1.Rating]
        }),
        __metadata("design:paramtypes", [])
    ], RecipeDetails);
    return RecipeDetails;
}());
exports.RecipeDetails = RecipeDetails;
//# sourceMappingURL=recipe-details.component.js.map