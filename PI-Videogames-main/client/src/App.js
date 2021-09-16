import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateGame from './components/CreateGame';
import Details from './components/Details'

import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getVideoGames, getGenres} from './actions/index';

function App() {
  
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getVideoGames());
    dispatch(getGenres());
  }, [dispatch]);
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogame" component={CreateGame} />
          {/* <Route path="/videogame" render={ props => <CreateGame {...props} />}  /> */}
          <Route exact path="/videogames/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
