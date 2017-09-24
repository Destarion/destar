"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// App
__export(require("./app.component"));
__export(require("./app.service"));
var app_service_1 = require("./app.service");
// Application wide providers
exports.APP_PROVIDERS = [
    app_service_1.AppState
];
//# Global Redux Stores
//
//** These `redux` `stores` are available in any template **
// Import module to provide an app `store` for the life-cycle of the app
var store_1 = require("@ngrx/store");
// Import all of the files necessary for our `recipes` component
var recipe_service_1 = require("./recipes/recipe.service");
var recipes_reducer_1 = require("./recipes/recipes.reducer");
var selected_recipe_reducer_1 = require("./recipes/selected-recipe.reducer");
//# Application Redux Stores
//
//** Redux stores for use with our Angular 2 app **
exports.APP_STORES = [
    // These are the primary consumers of our app store
    recipe_service_1.RecipeService,
    // Inititialize app store available to entire app
    // and pass in our reducers.
    // Notice that we are passing in an object that matches the
    // `AppStore` interface
    store_1.provideStore({ recipes: recipes_reducer_1.recipes, selectedRecipe: selected_recipe_reducer_1.selectedRecipe })
];
//# sourceMappingURL=index.js.map