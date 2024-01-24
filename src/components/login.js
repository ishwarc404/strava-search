
import './login.css';
import { useEffect, useState } from 'react';
import connectwithstrava from '../assets/btn_strava_connectwith_orange.svg'

function Login( {logIn} ) {

 const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=89361&redirect_uri=https://ishwarc404.github.io/strava-search/&response_type=code&scope=read,activity:read`;


 useEffect(() => {
    // Parse the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
        logIn(true);
        console.log("Authorization Code:", code);
    }
}, []);

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
