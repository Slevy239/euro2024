import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Error from './Components/Error/Error';
import './App.css';
import FixtureList from './Components/FixtureList/FixtureList';

function App() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          return; // Exit early
        }
        setEvents(data); // Assuming 'events' is the key in your JSON response for match events
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
  console.log(events)
  return (
    <div className="App">
      <Header />
      <div className="content">
        {error ? (
          <Error message={`Error: ${error}`} />
        ) : (
          <FixtureList matches={events} />
        )}
      </div>
    </div>
  );
}

export default App;
