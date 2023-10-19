import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User'
import 'devextreme/dist/css/dx.light.css';

import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
function App() {


  return (
      <>
      <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/user' element={<User />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
