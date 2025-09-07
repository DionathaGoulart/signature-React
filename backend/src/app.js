const setupApp = require('./config/app');
const contractRoutes = require('./routes/contractRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = setupApp();

// Rota de status
app.get('/', (req, res) => {
  res.send('Backend funcionando! 🚀');
});

// Rota de health check para UptimeRobot
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Servidor funcionando normalmente'
  });
});

// Rotas da aplicação
app.use('/api', contractRoutes);

app.use(errorHandler);

module.exports = app;
