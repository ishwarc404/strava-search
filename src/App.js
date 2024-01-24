import logo from './logo.svg';
import './App.css';
import SearchArea from './components/searcharea';
import Header from './components/header';
import Login from './components/login';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <div className="App">
      <Header/>
      
      {loggedIn ? <SearchArea/> : <Login logIn = {setLoggedIn}/>}
    </div>
  );
}

export default App;
