const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// Servir arquivos estáticos do dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback - todas as rotas retornam index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
  console.log('NIVELA® Landing Page ready for preview!');
});