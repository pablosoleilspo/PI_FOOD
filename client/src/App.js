import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home';
import RecipeCreate from './components/RecipeCreate/RecipeCreate';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
   
        <Route exact path="/" component={Landing} />
        <Route  exact path="/home" component={Home} />
        <Route exact path="/recipe" component={RecipeCreate} />
        <Route exact path="/recipes/:id" component={RecipeDetail} />
  
    </div>
    </BrowserRouter>
  );
}

export default App;
