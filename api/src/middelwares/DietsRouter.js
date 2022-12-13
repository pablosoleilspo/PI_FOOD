const {Router} = require('express');
const {Diet} = require('../db.js');


const DietsRouter = Router();


DietsRouter.get('/', async (req,res) => {
    let TypeDiet = [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "lacto ovo vegetarian",
        "vegan",
        "pescetarian",
        "paleolithic",
        "primal",
        "low fodmap",
        "whole 30",
        "dairy free",
    ]
    TypeDiet.forEach(e=> {
        Diet.findOrCreate({
            where: { name: e }
        })
    });
    let dietTypes = await Diet.findAll()
    return res.send(dietTypes)
})

module.exports = DietsRouter;