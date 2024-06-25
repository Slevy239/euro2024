// Result.js
import React from 'react';

function Result({ result }) {
  const { home_team, away_team, home_score, away_score, date } = result;

  return (
    <div className="result">
      <div className="teams">
        <span className="home-team">{home_team}</span>
        <span className="vs">vs</span>
        <span className="away-team">{away_team}</span>
      </div>
      <div className="scores">
        <span className="home-score">{home_score}</span>
        <span>-</span>
        <span className="away-score">{away_score}</span>
      </div>
      <div className="date">{date}</div>
    </div>
  );
}

export default Result;
