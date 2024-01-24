
import './login.css';
import { useEffect, useState } from 'react';
import connectwithstrava from '../assets/btn_strava_connectwith_orange.svg'
import axios from 'axios';
import {Spinner} from "@nextui-org/react";

function Login( {logIn, setUser} ) {

    const [spinnerActive, setSpinnerActive] = useState(false)
    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=89361&redirect_uri=https://ishwarc404.github.io/strava-search/&response_type=code&scope=read,activity:read`;


 useEffect(() => {
    // Parse the URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
        setSpinnerActive(true)
        axios.post('https://strava-chat-backend-little-frost-1318.fly.dev/login', { auth_code: code })
        .then(response => {
            setUser(response.data)
            setSpinnerActive(false)
            logIn(true);
        })
        .catch(error => {
            logIn(false);
        });
    }
}, []);

  return (
    <div className="Login">
        <div className='search-title d-flex justify-content-center'>Explore your activities, your way.</div>
        <a href={stravaAuthUrl} rel='noopener noreferrer'>
            <button>
                <img src={connectwithstrava}></img>
            </button>
        </a>
        <div>
        {
            spinnerActive ? ( <Spinner /> ) : ''
        }
        </div>
        <div>
        {
            spinnerActive ? (
          <div>
             <div>Downloading your data can a take few minutes, you will be redirected once it is downloaded. </div>
            <div>We download the latest 1000 activities. You can always delete them, don't worry.</div>
          </div>
            ) : ''
        }
        </div>
    </div>
  );
}

export default Login;
