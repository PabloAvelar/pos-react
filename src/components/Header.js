import React from 'react';
import logo from '../images/logo.png';
import '../styles/header.css';

function Header() {
    const getCurrentDateTime = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentDateTime = new Date().toLocaleString(undefined, options);
        return currentDateTime;
    };

    return (
        <div className="header-container">
            <div>
              
                <div className="welcome-message">Bienvenido: User</div>
            </div>
            <div className="date-time">
                <div className="time">{getCurrentDateTime().split(',')[1]}</div>
                <div className="date-text">{getCurrentDateTime().split(',')[0]}</div>
            </div>
        </div>
    );
}

export default Header;
