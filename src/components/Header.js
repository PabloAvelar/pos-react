import React from 'react';
import logo from '../images/logo.png';
import '../styles/header.css';
import { useAuth } from './AuthContext';

function Header() {
    const auth = useAuth();
    const getCurrentDateTime = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const currentDateTime = new Date().toLocaleString(undefined, options);
        return currentDateTime;
    };
    if (!auth.auth){
        // porque esta mamada tarda en cargar por las promesas miadas
        return <></>
    }
    return (
        <div className="header-container">
            <div>
              
                <div className="welcome-message">Welcome: {auth.auth.username}</div>
            </div>
            <div className="date-time">
                <div className="time">{getCurrentDateTime().split(',')[1]}</div>
                <div className="date-text">{getCurrentDateTime().split(',')[0]}</div>
            </div>
        </div>
    );
}

export default Header;
