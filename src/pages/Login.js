import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import React, { useState } from 'react';
import axios from 'axios';

export const Login = () => {
    const [inputs, setInputs] = useState({});
    const [errorMessages, setErrorMessages] = useState([]);
    let navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{

            const response = await axios.post(
                'http://localhost/pos-backend/api/login.php',
                new URLSearchParams({
                            'username': inputs.username,
                            'password': inputs.password
                        }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                }
            )

            // console.log(response.data)
            
            const result = await response.data;

            if (result.success){
                console.log("LOGIN!");
            }else{
                console.log("NOOOO");
            }
        }catch (e){
            console.error("Error: ", e);
        }
    }


    return (
        <div id="login">

            <form onSubmit={handleSubmit}>

                <font style={{ fontWeight: 'bold', fontSize: '44px', textShadow: '1px 1px 15px #000', color: '#fff' }}><center>BaseD</center></font>
                {/* <br> */}


                <div className="input-prepend">
                    <span style={{ height: 30, width: 25 }} className="add-on"><i className="icon-user icon-2x"></i></span>
                    <input style={{ height: 40 }} type="text" onChange={handleChange} name="username" placeholder="Username" required />
                </div>
                <div className="input-prepend">
                    <span style={{ height: 30, width: 25 }} className="add-on"><i className="icon-lock icon-2x"></i></span>
                    <input type="password" style={{ height: 40 }} onChange={handleChange} name="password" placeholder="Password" required />
                </div>
                <div className="qwe">
                    <button className="btn btn-large btn-primary btn-block pull-right" href="dashboard.html" type="submit"><i className="icon-signin icon-large"></i> Iniciar sesion</button>
                </div>
            </form>
        </div>

    );
}