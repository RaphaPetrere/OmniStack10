const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type:  { //coluna 
        type : String,  //tipo
        enum : ['Point'],
        required : true,
    },
    coordinates : {
        type : [Number], //array de numeros pra armazenar longitude e latitude
        required : true,
    },
});

module.exports = PointSchema;