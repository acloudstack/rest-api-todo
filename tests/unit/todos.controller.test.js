const TodosController = require("../../controllers/todos.controller");
const TodosModel = require("../../model/todos.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

/*TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();
TodoModel.findByIdAndDelete = jest.fn();*/
jest.mock("../../model/todos.model");

let req, res, next;
let timeout = 20000;
let todoId;

beforeEach(() => {    
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("TodosController.getTodos", () => {
    beforeEach(() => {
        req.body = {};
    });

    it("should have a getTodos function", () => {
        expect(typeof TodosController.getTodos).toBe("function");
    });
    it("should call TodoModel.find({})", async () => {
        TodosController.getTodos(req, res, next);
        expect(TodosModel.find).toBeCalledWith({});
    });
    it("should return response with status 200 and all todos", async () => {
        TodosModel.find.mockReturnValue(allTodos);
        await TodosController.getTodos(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it("should handle errors in getTodos", async () => {
        const errorMessage = { message: "Error finding" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodosModel.find.mockReturnValue(rejectedPromise);
        await TodosController.getTodos(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("TodosController.getTodosById", () => {
    beforeEach(() => {
        req.params.todoId = "5d5ecb5f6e598605f06cb925";
    });

    it("should have a getTodoById function", () => {
        expect(typeof TodosController.getTodoById).toBe("function");
    });
    it("should call TodoModel.findById with route parameters", async () => {
        req.params.todoId = todoId;
        await TodosController.getTodoById(req, res, next);
        expect(TodosModel.findById).toBeCalledWith(todoId);
    });
    it("should return response with status 200 and json body", async () => {
        TodosModel.findById.mockReturnValue(newTodo);
        await TodosController.getTodoById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should handle error", async () => {
        const errorMessage = { message: "error finding todoModel" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodosModel.findById.mockReturnValue(rejectedPromise);
        await TodosController.getTodoById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should handle 404", async () => {
        TodosModel.findByIdAndUpdate.mockReturnValue(null);
        await TodosController.updateTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});

describe("TodosController.updateTodo", () => {
    beforeEach(() => {
        todoId = "5d5ecb5f6e598605f06cb925";
        req.params.todoId = todoId;
        req.body = newTodo;
    });
    it("should have a updateTodo function", () => {
        expect(typeof TodosController.updateTodo).toBe("function");
    });
    it("should update with TodoModel.findByIdAndUpdate", async (done) => {
        await TodosController.updateTodo(req, res, next);
        expect(TodosModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodo, {
            new: true,
            useFindAndModify: false
        });
        done();
    }, timeout);
    it("should return a response with json data and http code 200", async () => {
        TodosModel.findByIdAndUpdate.mockReturnValue(newTodo);
        await TodosController.updateTodo(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Error" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodosModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await TodosController.updateTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
});

describe("TodosController.createTodo", () => {
    beforeEach(() => {
        req.body = newTodo;
    });

    it("should have a createTodo function", () => {
        expect(typeof TodosController.createTodo).toBe("function");
    });

    it("should call TodoModel.create", () => {        
        TodosController.createTodo(req, res, next);
        expect(TodosModel.create).toBeCalledWith(newTodo);
    });

    it("should return 201 response code", async () => {
        await TodosController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body response", async () => {
        TodosModel.create.mockReturnValue(newTodo);
        await TodosController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });

    it("should handle error - status property missing", async() => {
        const errorMsg = {"message": "status property is missing"};
        const rejectedPromise = Promise.reject(errorMsg);
        TodosModel.create.mockReturnValue(rejectedPromise);
        await TodosController.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMsg);
    });
});

describe("TodoController.deleteTodo", () => {
    it("should have a deleteTodo function", () => {
        expect(typeof TodosController.deleteTodo).toBe("function");
    });
    it("should call findByIdAndDelete", async () => {
        req.params.todoId = todoId;
        await TodosController.deleteTodo(req, res, next);
        expect(TodosModel.findByIdAndDelete).toBeCalledWith(todoId);
    });
    it("should return 200 OK and deleted todomodel", async () => {
        TodosModel.findByIdAndDelete.mockReturnValue(newTodo);
        await TodosController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newTodo);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it("should handle errors", async () => {
        const errorMessage = { message: "Error deleting" };
        const rejectedPromise = Promise.reject(errorMessage);
        TodosModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await TodosController.deleteTodo(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should handle 404", async () => {
        TodosModel.findByIdAndDelete.mockReturnValue(null);
        await TodosController.deleteTodo(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });
});
