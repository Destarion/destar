"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recipes_reducer_1 = require("./recipes.reducer");
var selected_recipe_reducer_1 = require("./selected-recipe.reducer");
var testing_1 = require("@angular/core/testing");
testing_1.describe('Recipes', function () {
    testing_1.describe('`selectedRecipe` store', function () {
        testing_1.it('returns null by default', function () {
            var defaultState = selected_recipe_reducer_1.selectedRecipe(undefined, { type: 'random', payload: {} });
            testing_1.expect(defaultState).toBeNull();
        });
        testing_1.it('`SELECT_RECIPE` returns the provided payload', function () {
            var selectRecipe = selected_recipe_reducer_1.selectedRecipe(undefined, { type: 'SELECT_RECIPE', payload: 'payload' });
            testing_1.expect(selectRecipe).toBe('payload');
        });
    });
    testing_1.describe('`recipes` store', function () {
        var initialState = [
            { _id: 0, name: 'First Recipe' },
            { _id: 1, name: 'Second Recipe' }
        ];
        testing_1.it('returns an empty array by default', function () {
            var defaultState = recipes_reducer_1.recipes(undefined, { type: 'random', payload: {} });
            testing_1.expect(defaultState).toEqual([]);
        });
        testing_1.it('`ADD_RECIPES`', function () {
            var payload = initialState, stateItems = recipes_reducer_1.recipes([], { type: 'ADD_RECIPES', payload: payload });
            testing_1.expect(stateItems).toEqual(payload);
        });
        testing_1.it('`CREATE_RECIPE`', function () {
            var payload = { _id: 2, name: 'added recipe' }, result = initialState.concat([payload]), stateItems = recipes_reducer_1.recipes(initialState, { type: 'CREATE_RECIPE', payload: payload });
            testing_1.expect(stateItems).toEqual(result);
        });
        testing_1.it('`UPDATE_RECIPE`', function () {
            var payload = { _id: 1, name: 'Updated Recipe' }, result = [initialState[0], { _id: 1, name: 'Updated Recipe' }], stateItems = recipes_reducer_1.recipes(initialState, { type: 'UPDATE_RECIPE', payload: payload });
            testing_1.expect(stateItems).toEqual(result);
        });
        testing_1.it('`DELETE_RECIPE`', function () {
            var payload = { _id: 0 }, result = [initialState[1]], stateItems = recipes_reducer_1.recipes(initialState, { type: 'DELETE_RECIPE', payload: payload });
            // DEBUG
            console.log('result: ');
            console.log(result);
            testing_1.expect(stateItems).toEqual(result);
        });
    });
});
//# sourceMappingURL=recipes.spec.js.map