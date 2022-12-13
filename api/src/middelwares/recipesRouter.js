const {Router} = require('express');
const {getAllRecipes } = require('../controllers/getRecipes.js');
const { addNewRecipe } = require('../controllers/postAddNewRecipe.js');
const { getRecipeById } = require('../controllers/getRecipesId.js');

const recipesRouter = Router();

//getRecipes
recipesRouter.get('/',async function (req,res) {
    try{
        const {name} = req.query;  
        const allRecipes = await getAllRecipes();
      //includes() determina si una cadena de texto puede ser encontrada dentro de otra cadena de texto, devolviendo true o false según corresponda.
      //toLowerCase() devuelve el valor en minúsculas de la cadena que realiza la llamada.
        if(name){
            const recipesByName = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
            
            if(recipesByName.length){ 
               return res.status(200).send(recipesByName);
            } else {
               return res.status(404).send({message : 'No recipes found'});
            }
        } else {
           return res.status(200).send(allRecipes);
        }
    } catch (error) {
        res.status(400).send({error : error.message});
    }
});
//postAddNewRecipe
recipesRouter.post('/', async (req, res) => {
    try{
        const {name, summary, healthScore, steps, createdInDB, diets, image} = req.body 
       
        if(!name || !summary || name.length < 3 || summary.length < 3 || !image){
            res.status(400).send({error : 'Name, summary and image are required'});
        }
        const newRecipe = await addNewRecipe(name, summary, healthScore, steps, createdInDB, diets, image);
        res.status(200).send(newRecipe);
    }catch(error){
        res.status(400).send({error: error.message})
    }
})

//getRecipesID
recipesRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
try{
    const recipeId = await getRecipeById(id)
    console.log(recipeId)
        if(recipeId){  
            res.status(200).send(recipeId); 
        } else {
            res.status(404).send({message : 'No recipe found'}); 
        } 
} catch (error) {
    res.status(400).send({error : error.message});
}
});  




module.exports = recipesRouter;