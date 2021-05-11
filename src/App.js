import './App.scss';
import { Route, Switch } from "react-router-dom"
import Login from "./components/login/Login"
import Register from "./components/register/Register";

function App() {
  return (
    <>
      <Switch>
        <Route exact path = "/register" render = {() => <Register />} />
        <Route exact path = "/login" render = {() => <Login />} />
      </Switch>
    </>
  );
}

export default App;
