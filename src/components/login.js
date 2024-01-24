
import './login.css';

import connectwithstrava from '../assets/btn_strava_connectwith_orange.svg'

function Login() {


 function loginwithstrava(){

 }

 const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=89361&redirect_uri=https://ishwarc404.github.io/&response_type=code&scope=read,activity:read`;


  return (
    <div className="Login">
        <div className='search-title d-flex justify-content-center'>Explore your activities, your way.</div>
        <a href={stravaAuthUrl} target='_blank' rel='noopener noreferrer'>
            <button>
                <img src={connectwithstrava}></img>
            </button>
        </a>
    </div>
  );
}

export default Login;
