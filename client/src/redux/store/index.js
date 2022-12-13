import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducer/index.js'

//Permite utilizar redux en toda la app


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) //thunk middleware que se encarga de la parte asincronica
);


export default store;


// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
//utilizar el devtools en el navegador


