import express from 'express';
import smsRoutes from './sms';
import contactRoutes from './contacts';
import { defaultSmsRoute, defaultContactRoute } from '../utils';
import { errorHandler } from '../middlewares';

const app = express();

app.use(defaultSmsRoute, smsRoutes);
app.use(defaultContactRoute, contactRoutes);
app.use(errorHandler);

export default app;
