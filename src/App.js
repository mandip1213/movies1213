import './App.css';
import Navbar from './Components/Navbar';
import Home from "./Components/Pages/Home"
import About from "./Components/Pages/About"
import SingleMovie from "./Components/Pages/SingleMovie"
import Error from "./Components/Pages/Error"
import Movieslist from './Components/Pages/Movieslist';
import {BrowserRouter as Router ,Route, Switch} from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/movie/:id">
          <SingleMovie/>
        </Route>
        <Route path="/movies/">
          <Home/>
          <Movieslist/>
        </Route>
        <Route path="*">
          <Error/>
        </Route>
      </Switch>

    </Router>    
  );
}

export default App;
