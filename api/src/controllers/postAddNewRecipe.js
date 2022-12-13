const {Recipe, Diet} = require('../db.js');


const addNewRecipe = async (name, summary, healthScore, steps, createdInDB, diets, image) => {
    try{
        const newRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        image,
        createdInDB
        });
    
        if(diets){  
            const dietsDB = await Diet.findAll({ 
                 where : {
                    name : diets
                }
                });
        await newRecipe.addDiet(dietsDB); // a lo que creamos le agregamos lo que conincidio con el nombre
    }
    
    return newRecipe; 
} catch(error){
    return {error : error.message};
    
}
}


module.exports = {addNewRecipe};