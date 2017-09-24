"use strict";
//# Global Pipes
//
//** These `pipes` are available in any template **
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//# APPLICATION_PIPES
//
//** Pipes that are global throughout our application **
exports.APPLICATION_PIPES = [];
exports.PIPES = [
    { provide: core_1.PLATFORM_PIPES, multi: true, useValue: exports.APPLICATION_PIPES }
];
//# sourceMappingURL=pipes.js.map