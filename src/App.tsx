import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import User from './components/User'
import 'devextreme/dist/css/dx.light.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
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
    <ToastContainer />

    </>
  )
}

export default App
