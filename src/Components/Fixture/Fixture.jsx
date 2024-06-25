// Fixture.js
import React from 'react';

function Fixture({ events }) {
  if (!events || !Array.isArray(events)) {
    return <p>No events available</p>;
  }

  return (
    <div className="fixture">
      <h2>Match Events</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Player</th>
            <th>Team</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{event.time}</td>
              <td>{event.player}</td>
              <td>{event.team}</td>
              <td>{event.eventType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fixture;
