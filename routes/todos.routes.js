const express = require("express");
const todosController = require("../controllers/todos.controller");
const router = express.Router();

router.post("/", todosController.createTodo);
router.get("/", todosController.getTodos);
router.get("/:todoId", todosController.getTodoById);
router.put("/:todoId", todosController.updateTodo);
router.delete("/:todoId", todosController.deleteTodo);

module.exports = router;

