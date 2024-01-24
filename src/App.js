import logo from './logo.svg';
import './App.css';
import SearchArea from './components/searcharea';
import Header from './components/header';
import Login from './components/login';
import { useState } from 'react';


// {"id": 43290018, "username": "ishwarc404", "resource_state": 2, "firstname": "Ishwar", "lastname": "Choudhary", "bio":
// "rookie", "city": "Boulder", "state": "Colorado", "country": "United States", "sex": "M", "premium": true, "summit":
// true, "created_at": "2019-06-15T18:46:29Z", "updated_at": "2023-11-29T09:00:35Z", "badge_type_id": 1, "weight": 66.0,
// "profile_medium": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/43290018/17643007/5/medium.jpg", "profile":
// "https://dgalywyr863hv.cloudfront.net/pictures/athletes/43290018/17643007/5/large.jpg", "friend": null, "follower":
// null}

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null)

  return (
    <div className="App">
      <Header userInfo={userInfo}/>
      
      {loggedIn ? <SearchArea athleteId={userInfo.id}/> : <Login logIn = {setLoggedIn} setUser={setUserInfo}/>}
    </div>
  );
}

export default App;
