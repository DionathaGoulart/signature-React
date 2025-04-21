const express = require('express');
const cors = require('cors');

const setupApp = () => {
  const app = express();

  // Middlewares globais
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  return app;
};

module.exports = setupApp;