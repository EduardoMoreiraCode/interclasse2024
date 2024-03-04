const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Obter o caminho do arquivo a ser servido
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Obter a extensão do arquivo
  const extname = path.extname(filePath);

  // Mapear tipos MIME para extensões de arquivo
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  // Verificar se o arquivo existe
  fs.exists(filePath, (exists) => {
    if (exists) {
      // Ler o arquivo
      fs.readFile(filePath, (error, content) => {
        if (error) {
          res.writeHead(500);
          res.end('Erro interno do servidor');
        } else {
          // Obter o tipo MIME com base na extensão do arquivo
          const contentType = mimeTypes[extname] || 'application/octet-stream';

          // Configurar os cabeçalhos da resposta
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content, 'utf-8');
        }
      });
    } else {
      // Arquivo não encontrado
      res.writeHead(404);
      res.end('Página não encontrada');
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
