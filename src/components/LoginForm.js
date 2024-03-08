import React, { useEffect, useState } from 'react';
import registerService from '../services/registerService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import '../styles/loginform.css';

function LoginForm() {
    const [inputs, setInputs] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);
    const [authenticated, setAuthenticated] = useState(null);
    const [token, setToken] = useState('');
    let navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const data = new URLSearchParams({
                'username': inputs.username,
                'password': inputs.password
            }).toString()

            registerService.login(data)
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        console.log("LOGIN!");
                        // Guardando el perro token en local
                        localStorage.setItem('token', res.token);
                        setToken(res.token);
                        navigate('/');
                        
                        // Refrescando la página
                        window.location.reload(false);
                    } else {
                        console.log("NOOOO");
                    }
                })
                .catch((err) => {
                    console.log("ERREOROEROEROER")
                    console.error(err);
                })

        } catch (e) {
            console.error("Error: ", e);
        }
    }

    // if the token changes
    useEffect(() => {
        setTimeout(() => {
            if (token) {
                // verifying the token
                async function validateToken() {
                    try {
                        const response = registerService.validateToken({
                            token
                        });
                        console.log(response);
                        if (response) {
                            console.log("Token validated");
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }

                validateToken();
            }
        }, 1000);
    }, [token]); // dependency

    return (
        <div className='login-card-container shadow'>
            <div style={{ marginTop: 20 }}>
                <span style={{ color: "#370021", fontWeight: 'bold', fontSize: 36 }}>
                    Login
                </span>
            </div>
            <form onSubmit={handleSubmit} className='login-card'>

                {/* <br> */}

                <div className='input-container'>
                    <div className="input-prepend">
                        <input className='input-form' type="text" onChange={handleChange} name="username" placeholder="Username" required />
                        <FontAwesomeIcon icon={faUser} className='icon' />
                    </div>
                    <div className="input-prepend">
                        <input className='input-form' type="password" onChange={handleChange} name="password" placeholder="Password" required />
                        <FontAwesomeIcon icon={faLock} className='icon' />
                    </div>
                </div>

                <div className="submit-container">
                    <button className="submit-button shadow" href="dashboard.html" type="submit">Login</button>
                </div>
            </form>
        </div>

    )
}

export default LoginForm