const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-mbmrn.mongodb.net/week10?retryWrites=true&w=majority',
{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

app.use(cors()); // cors() libera o acesso externo pra todo tipo de aplicação
// ou app.use(cors({ origin : 'http://localhost:3000' }));

app.use(express.json()); //pro express entender requisições q o corpo tem formato JSON
app.use(routes); //precisa vir dps do express.json, pq senão n le

//MongoDB (não-relacional) -> ótimo pra aplicações q nao possuem mtos relacionamentos. Fica na nuvem, noice

//Métodos HTTP : GET/POST/PUT/DELETE

//Tipos de Parametros
//Query Params : incorporados na url, ficam visiveis na URL da aplicação ?users=Raphael  request.query, usados pra filtros, ordenação, paginação...
//Route Params : exclusivamente nos métodos put e delete, vc informa qual usuário deletar e aonde /users/1 é o id 1    request.params
//Body : request.body (Dados para criação ou alteração de um registro)
app.listen(3333);

//adicionando CORS, Cross Origin Resource Sharing