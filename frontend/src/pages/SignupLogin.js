import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './SignupLogin.css'; // same Netflix style CSS

function SignupLogin() {
  const [isLogin, setIsLogin] = useState(false); // toggle between signup/login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/signup';

    try {
      const response = await axios.post(url, { username, password });
      toast.success(response.data.message);

      if (isLogin) {
        // After login, navigate to dashboard
        navigate('/dashboard');
      } else {
        // After signup, stay here and switch to login
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">{isLogin ? "Login" : "Sign Up"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />

        <button type="submit" className="signup-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? " Signup" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupLogin;
