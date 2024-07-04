import React, { useEffect, useState, useContext } from 'react';
import registerService from '../services/registerService';
import { Auth, use } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import DOMPurify from 'dompurify';

import '../styles/loginform.css';

function LoginForm({ badAuth }) {
    const [inputs, setInputs] = useState({});
    const [userData, setUserData] = useState('');

    let navigate = useNavigate();
    const auth = useContext(Auth);

    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = sanitizeInput(event.target.value);

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("erntrasadasdsa")
        try {

            const data = {
                'username': sanitizeInput(inputs.username),
                'password': sanitizeInput(inputs.password)
            };

            const res = await registerService.login(data)
            console.log("res", res);
            if (res.accessToken) {
                // Guardando el perro token en local
                auth.updateAuth(res);
                // navigate('/');

            } else {
                console.log("bad!!")
                badAuth()
            }

        } catch (e) {
            console.log("Error: ", e);
        }
    }

    // if the token changes
    useEffect(() => {
        setTimeout(() => {
            if (userData) {
                // verifying the token
                async function validateToken() {
                    try {
                        const response = registerService.validateToken({
                            userData
                        });
                        console.log(response);
                        if (response) {
                            console.log("Token validated");
                        } else {
                            console.log("no validado")
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }

                validateToken();
            }
        }, 1000);
    }, [userData]); // dependency

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