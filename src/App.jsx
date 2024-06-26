import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import FixtureList from './Components/FixtureList/FixtureList';
import Error from './Components/Error/Error';
import './App.css';

function App() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/fixtures')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.errors) {
          setError('Out of Requests');
          setLoading(false);
          return;
        }
        setMatches(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredMatches = matches.filter(match => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    // Check if team names match search term
    const teamMatch = match.teams.away.name.toLowerCase().includes(lowerCaseSearch) ||
      match.teams.home.name.toLowerCase().includes(lowerCaseSearch);

    // Check if there are goals or cards matching search term
    const eventMatch = match.events.some(event => {
      return (
        (event.type === 'Goal' && event.detail.toLowerCase().includes(lowerCaseSearch)) ||
        (event.type === 'Card' && event.detail.toLowerCase().includes(lowerCaseSearch))
      );
    });

    return teamMatch || eventMatch;
  });

  if (loading) {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        {error ? (
          <Error message={`Error: ${error}`} />
        ) : (
          <>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by team name, goals, or cards..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <FixtureList matches={filteredMatches} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
