const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');
const routes = Router();

routes.post('/devs', async (request , response) => {
    const { github_username, techs } = request.body;

    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    //ele espera a resposta pra ai sim continuar com o código
    const { name = login, avatar_url, bio } = apiResponse.data;
//invés de if(!name){
//    name = apiResponse.data.login;
//}         vamos fazer name = login
    const techsArray = techs.split(',').map(tech => tech.trim()); //percorrendo o array e a cada tech, ele remove o espaçamento antes e depois

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs : techsArray,
    })

    return response.json(dev);
}); //endereço localhost:3333

module.exports = routes;