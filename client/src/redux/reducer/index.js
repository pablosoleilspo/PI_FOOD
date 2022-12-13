//el reducer se encarga de tomar esas acciones y devolver x estado

const initialState = {
  diets: [],
  recipes: [],
  allRecipes: [],
  recipe:{},
};

function rootReducer(state = initialState, action) {
  //cada accion tiene {type:'GET_ALL_RECIPES', payload:[{}, {}, {}]}
  switch (action.type) {
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };

    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

      case 'GET_RECIPES_NAME':
        return{
          ...state,
          recipes:action.payload//arreglo renderizado 
        }
        case 'GET_RECIPE': 
        return {
            ...state,
            recipe: action.payload,
        }
         
        case 'CLEAN_DETAIL':
          return {
              ...state, 
              recipe: {}
          }

        case 'CREATE_RECIPES': 
        return {
            ...state,
        }

      case "ORDER_RECIPES_BY_NAME":
        if( action.payload === "asc"){
        state.recipes.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
        }
        if(action.payload === "desc"){ //retorna el arreglo ordenado
        state.recipes.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
        }
        
        return {
          ...state,
        };
    
        case 'ORDER_RECIPES_BY_SCORE':
        
        if( action.payload === "MHS"){
        state.recipes.sort((a, b) => {
              if (a.healthScore < b.healthScore) {
                return 1;
              }
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              return 0;
            })
        }
        if(action.payload === "mHS"){
        state.recipes.sort((a, b) => {
              if (a.healthScore < b.healthScore) {
                return -1;
              }
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              return 0;
            });
        }
        
        return {
          ...state,
        };

        case 'FILTER_RECIPES_BY_DIET': 
        const filterDiet = state.allRecipes.filter((recipe)=> recipe.diets.find((e)=> e.name === action.payload))//retorna la primera coincidencia del elemento que se busca.
           return {
               ...state,
               recipes: filterDiet,
           }
      

    default:
      return { ...state };
  }
}

export default rootReducer;
