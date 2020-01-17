const mongoose = require('mongoose');
//pra informar o formato do dev no DB
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name : String,
    github_username : String,
    bio : String,
    avatar_url : String,
    techs : [String], //é um array de Strings
    location : {
        type : PointSchema,
        index : '2dsphere' //toda vez q vai lidar com geolocalização, precisa de um indice
        //2dsphere pq é um eixo x e y só
    }
});  //estruturação de uma entidade no DB

module.exports = mongoose.model('Dev', DevSchema) //como será salvo no Db e o Schema