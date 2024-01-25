import { user } from '@nextui-org/react';
import summitslogo from '../assets/summits_logo_half.png'
import './header.css';
import {Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import axios from 'axios';
import { useState } from 'react';
function Header( {userInfo, logIn, setUserInfo} ) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [spinnerActive, setSpinnerActive] = useState(false);

    function deleteDataAndLogout(){
        setSpinnerActive(true)
        axios.post('https://strava-chat-backend-little-frost-1318.fly.dev/logout', { 
            athleteId: String(userInfo.id) })
        .then(response => {
            setSpinnerActive(false)
            handleLogOutSimple()
        })
    }

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
                <Button onPress={onOpen} color='danger' variant='bordered'>Log out & delete my data</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className='logout-modal-body'>
                <p> 
                  Are you sure you want to delete your data? It will be re-downloaded if you login again.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={deleteDataAndLogout} isLoading={spinnerActive}>
                  Delete and Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            </div>
        </div>) : '' }
        
    </div>
  );
}

export default Header;
