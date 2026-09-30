const express = require('express');
const router = express.Router();

const agendamentoController = require('../controllers/agendamentoController');


router.post('salvar/agendamentos', agendamentoController.criarAgendamento);

router.get('listar/agendamentos', agendamentoController.listarAgendamentos);

module.exports = router;
