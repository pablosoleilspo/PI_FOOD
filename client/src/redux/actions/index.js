//las acciones sirven para indicar lo que pasa en la app
//cada accion tiene {type:'GET_ALL_RECIPES', payload:[{}, {}, {}]}
import axios from 'axios'

export const getDiets = () => async (dispatch) => {
    try {
        const diets = await axios.get('pifood-production-911b.up.railway.app/diets');
        dispatch({ type: 'GET_DIETS', payload: diets.data }); 
    } catch (error) {
        console.log(error)
    }    
    } 

export const getAllRecipes = () => {
    return async(dispatch) => {
    try {
        const response = await axios.get('pifood-production-911b.up.railway.app/recipes')//coneccion conel back
        dispatch({//Dispatch: Es una función que permite lanzar acciones (actions) al store, con la intención de afectar el estado.
            type: 'GET_ALL_RECIPES',
            payload: response.data
        })
    } catch (error) {
        console.log(error)
    }
} 
}


export const getRecipesName = (name) => {
    return async (dispatch) => {
        try {
           const response =  await axios.get(`pifood-production-911b.up.railway.app/recipes?name=${name}`)
           dispatch({
            type: 'GET_RECIPES_NAME',
            payload: response.data
            })
        }catch(error){
            alert("This recipe doesn't exit");
            console.log(error) 
        }   
}
}

export const getRecipe = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`pifood-production-911b.up.railway.app/recipes/${id}`)
                dispatch({
                    type: 'GET_RECIPE',
                    payload: response.data
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export const cleanDetail = () => (dispatch) => {
    dispatch({
        type: 'CLEAN_DETAIL',
     
    })
}


export const createRecipes = (payload) => { 
    return async function () {
        let response = await axios.post('pifood-production-911b.up.railway.app/recipes', payload) 
    return response 
    } 
 }



    export const orderRecipesByName = (payload) => (dispatch) => {
        dispatch({
            type: 'ORDER_RECIPES_BY_NAME',
            payload
        })
    }

    export const orderRecipesByScore = (payload) => (dispatch) => {
        dispatch({
            type: 'ORDER_RECIPES_BY_SCORE',
            payload
        })
    }

    export const filterRecipesByDiet = (payload) => (dispatch) => {
        dispatch({
            type: 'FILTER_RECIPES_BY_DIET',
            payload
        })
    }
  

    


