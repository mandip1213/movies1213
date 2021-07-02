import './App.css';
import Navbar from './Components/Navbar';
import Home from "./Components/Pages/Home"
import About from "./Components/Pages/About"
import SingleMovie from "./Components/Pages/SingleMovie"
import Error from "./Components/Pages/Error"
import Movieslist from './Components/Pages/Movieslist';
import Toprated from './Components/Pages/Toprated';
import Popular from './Components/Pages/Popular';
import Upcoming from './Components/Pages/Upcoming';
import Trending from './Components/Trending';
import Links from './Components/Links';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
          <Links/>
        <Trending/>
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route path="/toprated">
          <Home/>
          <Links/>
          <Toprated />
        </Route>

        <Route path="/upcoming">
          <Home/>
          <Links/>
          <Upcoming />
        </Route>

        <Route path="/popular">
          <Home/>
          <Links/>
          <Popular />
        </Route>
      
        <Route path="/movies/:id">
          <SingleMovie />
        </Route>

        <Route path="/movies/">
          <Home />
          <Movieslist />
        </Route>

        <Route path="*">
          <Error />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
