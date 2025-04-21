const setupApp = require('./config/app');
const contractRoutes = require('./routes/contractRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = setupApp();

// Rota de status
app.get('/', (req, res) => {
  res.send('Backend funcionando! 🚀');
});

// Rotas da aplicação
app.use('/api', contractRoutes);

// Middleware de tratamento de erros (sempre deve ser o último)
app.use(errorHandler);

module.exports = app;