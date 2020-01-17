const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            //filtros
            techs : {
                //objeto pq pode ter filtros dentro do filtro
                $in : techsArray, //se o usuario tem as tecnologias dentro de
            },
            location : {
                $near : {
                    $geometry : {
                        type : 'Point',
                        coordinates : [longitude, latitude],
                    }, //passa um ponto
                    $maxDistance : 10000, //distancia maxima de 10km, 10000 metros
                },
            }
        });

        // Buscar todos devs num raio de 10km
        // Filtrar por tecnologias

        return response.json({ devs });
    }
}