import { useState } from 'react';
import './Login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
  
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,  // Even though the input says "email", FakeStoreAPI expects "username"
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.token); // store token in browser
  
      // Redirect user to product listing page
      window.location.href = '/products';
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="login-wrapper">
      <form className="login-container" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="show-password">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            /> Show Password
          </label>
        </div>

        <label className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          /> Remember Me
        </label>

        <button type="submit" className="login-button">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
