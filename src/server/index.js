import express from 'express';
import routes from '../services/notes/routes/index.js';
import ErrorHandler from '../middlewares/error.js';

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

export default app;
