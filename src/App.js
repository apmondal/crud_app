import './App.scss';
import { Route, Switch } from "react-router-dom"
import Login from "./components/login/Login"
import Register from "./components/register/Register";
import Home from './components/home/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path = "/" render = {() => <Home />} />
        <Route exact path = "/register" render = {() => <Register />} />
        <Route exact path = "/login" render = {() => <Login />} />
      </Switch>
    </>
  );
}

export default App;
