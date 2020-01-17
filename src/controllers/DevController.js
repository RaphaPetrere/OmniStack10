const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

/*controller normalmente tem 5 funções
index   :  quando quer mostrar uma lista
show    :   mostrar um unico 
store   :   criar 
update  :   alterar
destroy :   deletar

*/
module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request , response) {
        const { github_username, techs, latitude, longitude } = request.body; //corpo da requisição 
    
        let dev = await Dev.findOne({ github_username });
        if(!dev) //checka se há um dev ou não
        {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //ele espera a resposta pra ai sim continuar com o código
            const { name = login, avatar_url, bio } = apiResponse.data;
            //invés de if(!name){
            //    name = apiResponse.data.login;        desse jeito teria q ser let name, n const
            //}         vamos fazer name = login // se o name n existir, ele pega o valor do login
            const techsArray =  parseStringAsArray(techs); //percorrendo o array e a cada tech, ele remove o espaçamento antes e depois
        
            const location = {
                type : 'Point',
                coordinates : [longitude, latitude] //é assim q o Mongo utiliza
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs : techsArray,
                location,
            })
        }
    
        return response.json(dev);
    }
}