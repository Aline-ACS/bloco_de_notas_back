const express = require('express');

const server = express();

server.use(express.json());


const notes = [];


//campos de preenchimento obrigatório
function verifyData(req,res,next) {
    const {title, content, date, hour} = req.body;

    if(!title) {
        return res.json({
            error: 'título é obrigatório'
        });
    } else if (!content) {
        return res.json({
            error: 'conteúdo é obrigatório'
        });
    } else if (!date) {
        return res.json({
            error: 'data é obrigatória'
        });
    } else if (!hour) {
        return res.json({
            error: 'hora é obrigatória'
        });
    };

    next();
};


//rota inicial
server.get('/', (req,res) => {
    return res.json({
        result:'Desafio - Bloco de Notas'
    });
});


//lista de notas inseridas
server.get('/notes', (req,res) => {

    return res.json({notes});
});


//verificar uma única nota
server.get('/notes/:id', (req,res) => {
    const {id} = req.params;

    return res.json({
        result: 'nota encontrada com sucesso',
        note:notes[id]
    });
});


//deletar uma nota
server.delete('/notes/:id', (req,res) => {
   
    const {title, content, date, hour} = req.body;
    const note = {title, content, date, hour};
    
    const {id} = req.params;
    
    const remove = notes.splice(req.params.id, 1);

    return res.json({
        resul: 'nota excluída com sucesso',
        note:remove
    });

});


//atualizar as notas
server.put('/notes/:id', verifyData, (req,res) => {
   
    const {title, content, date, hour} = req.body;
    const {id} = req.params;

    const note = {
        title,
        content,
        date,
        hour
    };

    notes[id] = note;

    return res.json({
        resul: 'nota atualizada com sucesso',
        note: note
    });

});


//cadastrar nota
server.post('/notes', verifyData, (req,res) => {

    const {title, content, date, hour} = req.body;

    const note = {title, content, date, hour};

    notes.push(note);

    return res.json({note});
});




server.listen(3000);