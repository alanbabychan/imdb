import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SignupLogin.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // toggle between login/signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await axios.post('http://localhost:5000/api/auth/login', { username, password });
        toast.success("Login Successful!");
        navigate('/dashboard');
      } else {
        await axios.post('http://localhost:5000/api/auth/signup', { username, password });
        toast.success("Signup Successful!");
        setIsLogin(true); // after signup, switch to login
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">{isLogin ? 'Sign In' : 'Sign Up'}</h2>

        <input 
          type="text" 
          placeholder="Username" 
          className="signup-input"
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="signup-input"
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="signup-button">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <div className="toggle-text">
          {isLogin ? "New to Netflix?" : "Already have an account?"}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up now." : " Sign in now."}
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
