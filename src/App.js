import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Bygoogle from './components/Bygoogle';
import { Chat } from './components/Chat';
import { Home } from './components/Home';
import { Registro } from './components/Registro';
import { Recuperar } from './components/Recuperar';
import { Login } from './components/login';
import { AboutUs } from './components/AboutUs';
import { Features } from './components/Features';
import { Navbar } from './components/Navbar';
import { Soporte } from './components/Soporte';
import PrivateChat from './components/PrivateChat'
import {SupportChat} from './components/SupportChat'

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Switch>
        <Route path = "/SupportChat" component = {SupportChat}/>
          <Route path = "/PrivateChat" component = {PrivateChat}/>
          <Route path = "/Soporte" component = {Soporte} />
          <Route path = "/Features" component = {Features} />
          <Route path = "/AboutUs" component = {AboutUs} />
          <Route path = "/Registro" component = {Registro} />
          <Route path = "/Recuperar" component = {Recuperar} />
          <Route path = "/Home" component = {Home} />
          <Route path='/Chat' component= {Chat} />
          <Route path = "/" component = {Login} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
