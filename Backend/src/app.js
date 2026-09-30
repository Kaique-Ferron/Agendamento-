import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'agendamentos'
};

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Servidor backend rodando com sucesso!');
});

app.post('/salvar-agendamento', async (req, res) => {
    const { nome, procedimento, dia, hora } = req.body;
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao banco MySQL');

        const insertQuery = `
            INSERT INTO agendamentos (nome, procedimento, dia, hora)
            VALUES (?, ?, ?, ?);
        `;

        const [result] = await connection.execute(insertQuery, [nome, procedimento, dia, hora]);
        console.log(`Agendamento salvo com sucesso ID: ${result.insertId}`);

        const mensagem = `Olá ${nome}, aguardamos você para realizar o seu procedimento ${procedimento} do dia ${dia} às ${hora} horas.`;
        return res.status(200).send({ message: mensagem });

    } catch (erro) {
        console.error('Erro ao processar o agendamento ', erro);
        return res.status(500).send({ message: 'Erro interno ao salvar o agendamento' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.get('/listar-agendamento', async (req, res) => {
    let connection;

    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao Banco SQL');

        const [rows] = await connection.execute('SELECT * FROM agendamentos');
        return res.status(200).json(rows);
    } catch (erro) {
        console.error('Erro ao listar o agendamento', erro);
        return res.status(500).send({ message: 'Erro interno ao buscar o agendamento' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.listen(PORT, () => {
    console.log(`💈 Servidor da barbearia rodando com sucesso em http://localhost:${PORT}`);
});
