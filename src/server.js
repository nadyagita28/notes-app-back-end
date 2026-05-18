import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import ErrorHandler from './middlewares/error.js';

const app = express();

// Middleware & Routes
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

// Server Config
const port = process.env.PORT || 3000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
