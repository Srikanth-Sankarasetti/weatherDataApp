import {Route, Routes} from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import Search from "./components/Search"
import FavoriteLocations from "./components/FavoriteLocations"
import './App.css';



const App=()=>(
<>
<Routes>
<Route exact path="/" Component={WeatherApp}/>
<Route exact path="/favoritelocations" Component={FavoriteLocations}/>
<Route exact path="/search" Component={Search}/>
</Routes>
</>)
export default App;
