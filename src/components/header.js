import summitslogo from '../assets/summits_logo_half.png'
import './header.css';

function Header() {
  return (
    <div className="header d-flex justify-content-start">
        <div>
            <img className='header-logo' src={summitslogo}></img>
        </div>
        {/* <div className='header-title'>
            STRAVA ASSISTANT
        </div> */}
    </div>
  );
}

export default Header;
