import React from 'react';
import Fixture from '../Fixture/Fixture';
import './FixtureList.css'; // Import fixture list styles

function FixtureList({ fixtures }) {
  return (
    <div className="fixture-list">
      <h2>Current Fixtures</h2>
      {fixtures && fixtures.length > 0 ? (
        fixtures.map((fixture, index) => (
          <Fixture key={index} fixture={fixture} />
        ))
      ) : (
        <p>No current fixtures</p>
      )}
    </div>
  );
}

export default FixtureList;
