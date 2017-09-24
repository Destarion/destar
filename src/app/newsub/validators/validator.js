"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainValidator = (function () {
    function MainValidator() {
    }
    MainValidator.CannotContainSpace = function (control) {
        if (control.value.indexOf(' ') >= 0)
            return { cannotContainSpace: true };
        return null;
    };
    return MainValidator;
}());
exports.MainValidator = MainValidator;
//# sourceMappingURL=validator.js.map