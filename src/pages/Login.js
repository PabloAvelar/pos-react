import '../styles/login.css';
import LoginForm from '../components/LoginForm';
import background from '../images/background.jpg';
import logo from '../images/logo.png';
import { useAuth } from '../components/AuthContext';


function Login(){
    const auth = useAuth();
    console.log(auth)
    // console.log(auth)
    return (
        <div className="login">
            <img className='fixed-logo' src={logo} style={{width: '45%', height: 'auto'}} />
            <LoginForm/>
        </div>

    );
}

export default Login;