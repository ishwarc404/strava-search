import logo from './logo.svg';
import './App.css';
import SearchArea from './components/searcharea';
import Header from './components/header';
import Login from './components/login';
function App() {
  return (
    <div className="App">
      <Header/>
      <Login />
     {/* <SearchArea/> */}
    </div>
  );
}

export default App;
