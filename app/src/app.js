const dotenv = require('dotenv');
const fs = require('fs');
const express = require('express');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const healthRoutes = require('./routes/healthRoutes');
const viewRoutes = require('./routes/viewRoutes');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { requestLogger } = require('./middlewares/requestLogger');

const envPath = path.resolve(__dirname, '../.env');
const rootExamplePath = path.resolve(__dirname, '../../.env.example');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else if (fs.existsSync(rootExamplePath)) {
  dotenv.config({ path: rootExamplePath });
}

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/', viewRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

app.use(errorMiddleware);

module.exports = app;
