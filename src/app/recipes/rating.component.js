"use strict";
// ```
// rating.component.js
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// rating.component.js may be freely distributed under the MIT license
// ```
Object.defineProperty(exports, "__esModule", { value: true });
// # Rating Component
var core_1 = require("@angular/core");
var Rating = (function () {
    function Rating() {
        this.updateRate = new core_1.EventEmitter();
        this.range = [1, 2, 3, 4, 5];
    }
    Rating.prototype.update = function (value) {
        // Check to see if this component should be interactive or not
        if (this.interactive) {
            this.rate = value;
            // push a new value every time we click on a star
            // this is thanks to the fact that the `NG2` `EventEmitter`
            // is using `Rx` thus this is an `Observable`
            this.updateRate.next(value);
        }
        else {
            // DEBUG
            console.log('This rating component is not interactive.');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], Rating.prototype, "rate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Rating.prototype, "interactive", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], Rating.prototype, "updateRate", void 0);
    Rating = __decorate([
        core_1.Component({
            selector: 'rating',
            template: require('./rating.html'),
            directives: []
        })
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;
//# sourceMappingURL=rating.component.js.map