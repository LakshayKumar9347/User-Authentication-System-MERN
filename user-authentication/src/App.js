// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import { Route, Routes } from 'react-router-dom'

function App() {
  const [user, setLoginUser] = useState({})
  console.log(user._id);


  return (

    <>
      <Routes>
        <Route path='/' element={user ? <Dashboard/>:<Login/>} />
        <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
