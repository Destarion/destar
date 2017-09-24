"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_hmr_1 = require("angular2-hmr");
var AppState = (function () {
    function AppState() {
        // `HmrState` is used by `HMR` to track the any `state` during reloading
        this._state = {};
    }
    Object.defineProperty(AppState.prototype, "state", {
        // Already return a `clone` of the current `state`
        get: function () {
            return this._state = this._clone(this._state);
        },
        // Never allow mutation
        set: function (value) {
            throw new Error('Do not mutate the `.state` directly!');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // Use our `state` getter for the `clone`
        var state = this.state;
        return state[prop] || state;
    };
    AppState.prototype.set = function (prop, value) {
        // Internally mutate our `state`
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // Simple object `clone`
        return JSON.parse(JSON.stringify(object));
    };
    __decorate([
        angular2_hmr_1.HmrState(),
        __metadata("design:type", Object)
    ], AppState.prototype, "_state", void 0);
    AppState = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AppState);
    return AppState;
}());
exports.AppState = AppState;
//# sourceMappingURL=app.service.js.map