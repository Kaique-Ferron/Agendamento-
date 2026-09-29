import pool from '../config/database.js';

// Salvar um novo agendamento
export const salvarAgendamento = async (req, res) => {
  const { nome, procedimento, dia, hora } = req.body;

  if (!nome || !procedimento || !dia || !hora) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    const insertQuery = `
      INSERT INTO agendamentos (nome, procedimento, dia, hora)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.execute(insertQuery, [nome, procedimento, dia, hora]);

    const mensagem = `Olá ${nome}, aguardamos você para realizar o seu procedimento ${procedimento} no dia ${dia} às ${hora} horas.`;

    return res.status(201).json({
      id: result.insertId,
      message: mensagem
    });
  } catch (err) {
    console.error('Erro ao processar o agendamento:', err);
    return res.status(500).json({ message: 'Erro interno ao salvar o agendamento' });
  }
};

// Listar todos os agendamentos
export const listarAgendamentos = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM agendamentos ORDER BY created_at DESC');
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Erro ao listar agendamentos:', err);
    return res.status(500).json({ message: 'Erro interno ao buscar os agendamentos' });
  }
};