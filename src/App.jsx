import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Fixture from './Components/Fixture/Fixture'; // Import Fixture component
import Error from './Components/Error/Error'; // Import ErrorComponent
import './App.css'; // Import your CSS for styling
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
        // Check if the API response contains an 'errors' key with 'Out of Requests' message
        if (data.errors) {
          setError(error);
          setLoading(false);
          throw new Error('Out of Requests');
        }
        setEvents(data.events); // Assuming 'events' is the key in your JSON response for match events
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App"><Header /><p>Loading...</p></div>;
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        {error ? (
          <Error message={`Error: ${error}`} />
        ) : (
          <FixtureList events={events} />
        )}
      </div>
    </div>
  );
}

export default App;
