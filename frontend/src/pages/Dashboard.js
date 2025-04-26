import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchMovies = async (selectedGenre, sort = false) => {
    let url = `http://localhost:5000/api/movies?genre=${selectedGenre}`;
    if (sort) {
      url += '&sort=rating';
    }
    const response = await axios.get(url);
    setMovies(response.data);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={() => { setGenre('Romance'); fetchMovies('Romance'); }}>Romance</button>
      <button onClick={() => { setGenre('Comedy'); fetchMovies('Comedy'); }}>Comedy</button>
      <button onClick={() => { setGenre('Action'); fetchMovies('Action'); }}>Action</button>

      <button onClick={() => fetchMovies(genre, true)}>Sort by Rating</button>

      <button onClick={handleLogout} style={{ backgroundColor: 'red', marginLeft: '20px' }}>Logout</button>

      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.name} - {movie.rating}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
