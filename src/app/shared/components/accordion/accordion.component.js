"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Accordion = (function () {
    function Accordion() {
        this.groups = [];
    }
    Accordion.prototype.addGroup = function (group) {
        this.groups.push(group);
    };
    Accordion.prototype.closeOthers = function (openGroup) {
        this.groups.forEach(function (group) {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    };
    Accordion.prototype.removeGroup = function (group) {
        var index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    };
    Accordion = __decorate([
        core_1.Component({
            selector: 'accordion, [accordion]',
            host: {
                'class': 'panel-group'
            },
            template: '<ng-content></ng-content>'
        })
    ], Accordion);
    return Accordion;
}());
exports.Accordion = Accordion;
//# sourceMappingURL=accordion.component.js.map