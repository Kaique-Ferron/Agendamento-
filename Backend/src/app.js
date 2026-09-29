import express from 'express';
import mysql from 'mysql12/promise';
import cors from 'cors';





app.post('/salvar-agendamento', async (req, res) =>{

    const { nome , procedimento , dia, hora} = req.body;

    let connection;

    try{
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao banco MySQL');

        const insertQuery = `
        INSERT INTO agendamentos (nome, procedimento, dia , hora)
        VALUES(?,?,?,?);

        `;

        const [result] = await connection.execute(insertQuery, [nome. procedimento, dia , hora]);
         console.log(`Agendamento salvo com sucesso ID: ${result.insertId}`);

         const mensagem = `Olá ${nome},
         aguardamos você para realizar o seu procedimento
         ${procedimento} do dia ${dia} Às ${hora} horas.
         `;

         res.status(200).send({message: mensagem});

    }catch (erro){
        console.error('Erro ao processar o agendamento ', erro);
        res.status (500).send({  message: 'Erro interno ao salvar o agendamentos' });

    }finally{
        if(connection){
            connection.end();
        }
    }
});

app.get('/listar-agendamento', async(req, res) =>{

    let connection;

    try{
        connection = await mysql.createConnection(dbConfig);
        console.log('Conenctado ao Banco Sql');

        const [rows] = await connection.execute('SELECT * FROM agendamentos');
        res.status(200).json(rows);
    }catch (erro){
        console.error('Erro ao listar o agendamento'. erro);
        res.status(500).send ( {message: 'Erro interno ao buscar o agendamento'});

    }if (connection){
        connection.end();
    }

});

app.listen( PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

