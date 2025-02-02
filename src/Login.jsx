import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('http://localhost:5001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/blog'); 
            } else {
                alert('❌ Feil brukernavn eller passord');
            }
        })
        .catch(error => console.error('❌ Feil ved innlogging:', error));
    };

    return (
        <section id="login">
            <div className="login-container">
                <h2>Admin Login</h2>
                <input 
                    type="text" 
                    placeholder="Brukernavn" 
                    value={credentials.username} 
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
                />
                <input 
                    type="password" 
                    placeholder="Passord" 
                    value={credentials.password} 
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                />
                <button onClick={handleLogin}>Logg inn</button>
            </div>
        </section>
    );
}

export default Login;
