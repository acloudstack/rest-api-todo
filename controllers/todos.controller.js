const TodosModel = require("../model/todos.model");

exports.createTodo = async (req, res, next) => {
    try{
        const createdTodo = await TodosModel.create(req.body);
        res.status(201).json(createdTodo);
    } catch(err){
        next(err);
    }
};

exports.getTodos = async (req, res, next) => {
    try{
        const allTodos = await TodosModel.find({});
        res.status(200).json(allTodos);
    } catch(err){
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const todosModel = await TodosModel.findById(req.params.todoId);
        if (todosModel) {
            res.status(200).json(todosModel);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodosModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            {
                new: true,
                useFindAndModify: false
            }
        );
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await TodosModel.findByIdAndDelete(req.params.todoId);

        if (deletedTodo) {
            res.status(200).json(deletedTodo);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        next(err);
    }
};
