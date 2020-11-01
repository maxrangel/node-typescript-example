import { Router } from 'express';

import { Todo } from '../models/todos.interface';

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    todos
  });
});

router.post('/', (req, res, next) => {
  const { text } = req.body;

  const newTodo: Todo = { id: new Date().toISOString(), text };
  todos.push(newTodo);

  res.status(201).json({ status: 'Success', newTodo });
});

router.put('/:todoId', (req, res, next) => {
  const { todoId } = req.params;
  const { text } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) {
    res.status(404).json({ status: 'fail', message: 'Not found' });
    return;
  }

  todos[todoIndex] = { ...todos[todoIndex], text };

  res.status(200).json({ status: 'success', todos });
});

router.delete('/:todoId', (req, res, next) => {
  const { todoId } = req.params;

  const todo = todos.find(todo => todo.id === todoId);

  if (!todo) {
    res.status(404).json({ status: 'fail', message: 'Not found' });
    return;
  }

  todos = todos.filter(todo => todo.id !== todoId);

  res.status(200).json({ status: 'success', todos });
});

export default router;
