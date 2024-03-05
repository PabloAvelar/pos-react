import '../styles/login.css';
import LoginForm from '../components/LoginForm';
import background from '../images/background.jpg';
import logo from '../images/logo.png';


function Login(){

    return (
        <div className="login">
            <img className='fixed-logo' src={logo} style={{width: '45%', height: 'auto'}} />
            <LoginForm/>
        </div>

    );
}

export default Login;