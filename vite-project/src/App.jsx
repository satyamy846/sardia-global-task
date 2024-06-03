import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import UpdatePassword from './components/UpdatePassword';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/update-password" element={<UpdatePassword/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
