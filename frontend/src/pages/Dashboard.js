import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample movie data with 30 movies
const movies = Array(30).fill(null).map((_, index) => ({
  name: `Movie ${index + 1}`,
  imdbRating: (8 + (index % 5) * 0.1).toFixed(1),
  trailerUrl: `https://www.youtube.com/embed/EXeTwQWrcwY`,
  description: `This is a description of Movie ${index + 1}.`,
  characters: [`Character 1`, `Character 2`, `Character 3`],
  image: `https://placekitten.com/200/300?image=${index + 1}`
}));

const Dashboard = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleLogout = () => {
    // Example logout logic (redirect to login)
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h2 className="title">Movies Dashboard</h2>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="movie-item"
            onClick={() => handleMovieClick(movie)}
          >
            <img className="movie-poster" src={movie.image} alt={movie.name} />
            <div className="movie-info">
              <h3>{movie.name}</h3>
              <p>IMDb: {movie.imdbRating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <div className="movie-modal">
          <div className="modal-content">
            <button onClick={closeModal} className="close-btn">Close</button>
            <h2>{selectedMovie.name}</h2>
            <iframe
              src={selectedMovie.trailerUrl}
              title="Movie Trailer"
              width="100%"
              height="400px"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p><strong>Description:</strong> {selectedMovie.description}</p>
            <p><strong>Characters:</strong> {selectedMovie.characters.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
