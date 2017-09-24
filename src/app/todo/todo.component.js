"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todo_service_1 = require("./todo.service");
// We `import` `http` into our `TodoService` but we can only
// specify providers within our component
var http_1 = require("@angular/http");
// Create metadata with the `@Component` decorator
var Todo = (function () {
    function Todo(todoService) {
        var _this = this;
        this.todoService = todoService;
        // Initialize our `todoData.text` to an empty `string`
        this.todoData = {
            text: ''
        };
        this.todos = [];
        console.log('Todo constructor go!');
        //this.todos = [];
        todoService.getAll()
            .subscribe(function (res) {
            // Populate our `todo` array with the `response` data
            _this.todos = res;
            // Reset `todo` input
            _this.todoData.text = '';
        });
    }
    Todo.prototype.createTodo = function () {
        var _this = this;
        this.todoService.createTodo(this.todoData)
            .subscribe(function (res) {
            // Populate our `todo` array with the `response` data
            _this.todos = res;
            // Reset `todo` input
            _this.todoData.text = '';
        });
    };
    Todo.prototype.deleteTodo = function (id) {
        var _this = this;
        this.todoService.deleteTodo(id)
            .subscribe(function (res) {
            // Populate our `todo` array with the `response` data
            _this.todos = res;
        });
    };
    Todo = __decorate([
        core_1.Component({
            // HTML tag for specifying this component
            selector: 'todo',
            // Let Angular 2 know about `Http` and `TodoService`
            providers: http_1.HTTP_PROVIDERS.concat([todo_service_1.TodoService]),
            template: require('./todo.html')
        }),
        __metadata("design:paramtypes", [todo_service_1.TodoService])
    ], Todo);
    return Todo;
}());
exports.Todo = Todo;
//# sourceMappingURL=todo.component.js.map