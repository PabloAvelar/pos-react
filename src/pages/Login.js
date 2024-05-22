import '../styles/login.css';
import LoginForm from '../components/LoginForm';
import logo from '../images/logo.png';
import { useAuth } from '../components/AuthContext';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { useRef } from 'react';

function Login() {
    const auth = useAuth();
    const notificationShownRef = useRef(false); // Referencia para notificación

    const showNotification = (title, message, type, duration) => {
        Store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: duration,
                onScreen: true
            }
        });
    };

    const handleBadLogin = async () => {
        showNotification(
            "¡Error en la autenticación!",
            "El nombre de usuario o contraseña es incorrecto.",
            "danger",
            5000
        );

    }

    return (
        <div className="login">
            <ReactNotifications />
            <img className='fixed-logo' src={logo} style={{ width: '45%', height: 'auto' }} />
            <LoginForm badAuth={handleBadLogin} />
        </div>

    );
}

export default Login;