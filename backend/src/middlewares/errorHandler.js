const errorHandler = (err, req, res, next) => {
  console.error('Erro na aplicação:', err);

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;
