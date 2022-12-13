const {Recipe, Diet} = require('../db.js');
const axios = require('axios');
const {API_KEY} = process.env;
//modulo nativo de htttp de node lla url

const getRecipeById = async function(id) {
    try {
        if(id.toString().length < 8){//cadena que representa al objeto
            const recipeByIdAPI = await axios({
                method: 'get',
                url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
                headers: {"Accept-Encoding": "null"}
              }) 
              const recipeByIdAPI2 = recipeByIdAPI.data 

            const idAPI = {
              id: recipeByIdAPI2.id,
              name: recipeByIdAPI2.title,
              summary: recipeByIdAPI2.summary,
              healthScore: recipeByIdAPI2.healthScore,
              steps : recipeByIdAPI2.analyzedInstructions[0]?.steps.map((e)=> e.step), 
              image: recipeByIdAPI2.image,
              diets: recipeByIdAPI2.diets.map((element) => ({name:element})),
            }
            return idAPI;
        } else {
            const recipe = await Recipe.findByPk(id, {//entrada de la tabla, utilizando la clave principal proporcionada.
                include: {
                    model: Diet,
                    atributes: ["name"],
                    through: {
                        attributes: [] //comprobacion que se hace (mediante los atributos)
                    }
                }
            })
             return recipe
        }
        
    } catch (error) {
        return (error.message)
    }
}

module.exports = {getRecipeById}

