const mongoose = require('mongoose');
//pra informar o formato do dev no DB

const DevSchema = new mongoose.Schema({
    name : String,
    github_username : String,
    bio : String,
    avatar_url : String,
    techs : [String], //é um array de Strings
});  //estruturação de uma entidade no DB

module.exports = mongoose.model('Dev', DevSchema) //como será salvo no Db e o Schema