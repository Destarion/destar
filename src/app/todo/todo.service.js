"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
// `Injectable` is usually used with `Dart` metadata
// generation; it has no special meaning within `TypeScript`
// This makes sure `TypeScript` emits the needed metadata
// Reference : http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
var TodoService = (function () {
    // The `public` keyword denotes that the constructor parameter will
    // be retained as a field.
    // Reference: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#336-members
    // Add `Http` type annotation to the `http` function argument
    // Type annotations in TypeScript are used to record the
    // intended contract of the function or variable.
    // Reference: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3-types
    // Here we intend the constructor function to be called with the
    // `Http` parameter
    function TodoService(http) {
        this.http = http;
    }
    TodoService.prototype.getAll = function () {
        return this.http.get('/api/todo')
            .map(function (res) { return res.json(); });
    };
    TodoService.prototype.createTodo = function (data) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/todo', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TodoService.prototype.deleteTodo = function (id) {
        return this.http.delete("/api/todo/" + id)
            .map(function (res) { return res.json(); });
    };
    TodoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map