const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); // Importe o body-parser

app.use(bodyParser.urlencoded({ extended: true })); // Configure o body-parser

const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);

const ipAddress = '172.16.31.36'; // Endereço IP da máquina
const port = 3006;

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'acesso123', 
  database: 'agua',
});

app.post('/adicionarRegistro', (req, res) => {
    const { quant } = req.body;
  
    const sql = 'INSERT INTO registros (quant, data) VALUES (?, NOW())'; // Use NOW() para a data e hora atuais
    const values = [quant];
  
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Erro ao inserir registro:', error);
        res.status(500).json({ error: 'Erro ao inserir registro' });
      } else {
        console.log('Registro inserido com sucesso!');
        res.redirect('/');
      }
    });
  });

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

app.listen(port, ipAddress, () => {
  console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});