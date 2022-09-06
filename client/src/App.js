import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import CreateRecipe from './components/CreateRecipe';
import { RecipeDetail } from './components/RecipeDetail';

function App() {
  return (
    <div className="App">
    <Route exact path = '/recipe/create' component={CreateRecipe}/>
    <Route exact path = '/recipes/:idRecipe' component={RecipeDetail}/>
    <Route exact path='/home' component={Home}/>
    <Route exact path='/' component={LandingPage}/>
    </div>
  );
}


export default App;
