import React, { useState } from 'react';

const LoginSignupForm = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation checks here
    if (isLogin) {
      onLogin(email, password); // Call the login function passed from the parent component
    } else {
      onSignup(email, password); // Call the signup function passed from the parent component
    }
    // Reset form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin
          ? "Don't have an account? "
          : 'Already have an account? '}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default LoginSignupForm;
