import express from 'express';
import bodyParser from 'body-parser';

// Routes
import todosRoutes from './routes/todos.routes';

const app = express();

app.use(bodyParser.json());

app.use(todosRoutes);

app.listen(3000, () => {
  console.log('Running on port 3000');
});
