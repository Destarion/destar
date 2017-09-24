"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// Import NgClass directive
var common_1 = require("@angular/common");
var accordion_component_1 = require("./accordion.component");
var AccordionGroup = (function () {
    function AccordionGroup(accordion) {
        this.accordion = accordion;
        this._isOpen = false;
        this.accordion.addGroup(this);
    }
    AccordionGroup.prototype.toggleOpen = function (event) {
        event.preventDefault();
        this.isOpen = !this.isOpen;
    };
    AccordionGroup.prototype.onDestroy = function () {
        this.accordion.removeGroup(this);
    };
    Object.defineProperty(AccordionGroup.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            this._isOpen = value;
            if (value) {
                this.accordion.closeOthers(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionGroup = __decorate([
        core_1.Component({
            selector: 'accordion-group, [accordion-group]',
            inputs: ['heading', 'isOpen'],
            directives: [common_1.NgClass],
            template: require('./accordion-group.html')
        }),
        __metadata("design:paramtypes", [accordion_component_1.Accordion])
    ], AccordionGroup);
    return AccordionGroup;
}());
exports.AccordionGroup = AccordionGroup;
//# sourceMappingURL=accordion-group.component.js.map