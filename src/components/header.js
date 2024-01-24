import { user } from '@nextui-org/react';
import summitslogo from '../assets/summits_logo_half.png'
import './header.css';
import {Button} from "@nextui-org/react";

function Header( {userInfo, logIn, setUserInfo} ) {

    function handleLogOutSimple(){
        window.location = ''
        setUserInfo(null);
        logIn(false);
    }
  return (
    <div className="header d-flex justify-content-start">
        <div>
            <img className='header-logo' src={summitslogo}></img>
        </div>
        {
        userInfo ? 
        
       ( <div className='search-title'>
             {userInfo.firstname} {userInfo.lastname}
        </div> )

        : ''
        }
         {
        userInfo ? 
        (<div style={{ marginTop: '1vw', marginLeft: 'auto' }}>
            <div className='d-flex justify-content-end' style={{ marginBottom: '0.5vw'}}>
                <Button color='secondary' variant='bordered' onPress={handleLogOutSimple}>Log out</Button>
            </div>
            <div>
                <Button color='danger' variant='bordered'>Log out & delete my data</Button>
            </div>
        </div>) : '' }
        
    </div>
  );
}

export default Header;
