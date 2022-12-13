const {Recipe, Diet} = require('../db.js');
const axios = require('axios');
const {API_KEY} = process.env;

//modulo nativo de htttp de node lla url
const getRecipesApi = async ()=> {
    try {
    const recipesApi= await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`,
        headers: {"Accept-Encoding": "null"}
      }) 

    const recipesApi2 = recipesApi.data.results?.map((element)=>{ // ? verifica si el arreglo o lo que esté a la izquierda tiene algo si tiene se efectuara lo que esta a la derecha
        return {
            id: element.id,
            name: element.title,
            summary: element.summary,
            healthScore: element.healthScore,
            steps : element.analyzedInstructions[0]?.steps.map((e)=> e.step), //[{}]
            image: element.image,
            diets: element.diets.map((element) => ({name:element})),
        }
    });
  
        return recipesApi2; 
    } catch (error) {
        return (error.message)
    }
};


const getRecipesDb = async () => {
    try {
        const recipesDb = await Recipe.findAll({ 
            
            include: {                           
                model: Diet,            
                attributes: ['name'],             
                through: {attributes: []} //comprobacion que se hace (mediante los atributos)
            }
        });
        
        return recipesDb; 
    } catch (error) {
        return (error.message)
    }
}




const getAllRecipes = async () => {
    const apiRecipes = await getRecipesApi(); 
    const dbRecipes = await getRecipesDb(); 
    const allrecipes = apiRecipes.concat(dbRecipes); 
    return allrecipes; 

}






module.exports = {getRecipesApi, getRecipesDb, getAllRecipes};