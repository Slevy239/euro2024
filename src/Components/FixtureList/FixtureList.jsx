import React from 'react';
import './FixtureList.css'; // Import your CSS for styling

const FixtureList = ({ matches }) => {
  return (
    <div className="fixture-list">
      <h2>World Matches</h2>
      {matches.map((match, index) => (
        <div key={index} className="match">
          <div className="match-header">
            <div className="league-info">
              <img className="league-logo" src={match.league.logo} alt={match.league.name} />
              {match.league.flag && (
                <img className="league-flag" src={match.league.flag} alt={`${match.league.country} Flag`} />
              )}
              <div className="league-details">
                <h3>{match.league.name}</h3>
                <p>{match.league.country}</p>
                <p>{match.league.round}</p>
              </div>
            </div>
            <div className="score">
              <h4>{match.goals.away} - {match.goals.home}</h4>
              {/* Optionally display more detailed scores like halftime, fulltime, etc. if available */}
            </div>
          </div>
          <div className="teams">
            <div className="team">
              <div className="team-header">
                <img className="team-logo" src={match.teams.away.logo} alt={match.teams.away.name} />
                <p>{match.teams.away.name}</p>
              </div>
              <div className="events">
                {match.events && match.events.length > 0 && (
                  <>
                    <div className="goals">
                      <h3>Goals:</h3>
                      {match.events
                        .filter(event => event.type === 'Goal' && event.team.id === match.teams.away.id)
                        .map((goal, idx) => (
                          <p key={idx}>
                            {goal.detail} || {goal.player.name} {goal.time.elapsed}'
                          </p>
                        ))}
                    </div>
                    <div className="cards">
                      <h3>Cards:</h3>
                      {match.events
                        .filter(event => event.type === 'Card' && event.team.id === match.teams.away.id)
                        .map((card, idx) => (
                          <p key={idx} className={`card ${card.detail.toLowerCase()}`}>
                            {card.detail} || {card.player.name} {card.time.elapsed}'
                          </p>
                        ))}
                    </div>
                  </>
                )}
                {!match.events || match.events.length === 0 && (
                  <p>No events recorded.</p>
                )}
              </div>
            </div>
            <div className="team">
              <div className="team-header">
                <img className="team-logo" src={match.teams.home.logo} alt={match.teams.home.name} />
                <p>{match.teams.home.name}</p>
              </div>
              <div className="events">
                {match.events && match.events.length > 0 && (
                  <>
                    <div className="goals">
                      <h3>Goals:</h3>
                      {match.events
                        .filter(event => event.type === 'Goal' && event.team.id === match.teams.home.id)
                        .map((goal, idx) => (
                          <p key={idx}>
                            {goal.detail} || {goal.player.name} {goal.time.elapsed}'
                          </p>
                        ))}
                    </div>
                    <div className="cards">
                      <h3>Cards:</h3>
                      {match.events
                        .filter(event => event.type === 'Card' && event.team.id === match.teams.home.id)
                        .map((card, idx) => (
                          <p key={idx} className={`card ${card.detail.toLowerCase()}`}>
                            {card.detail} || {card.player.name} {card.time.elapsed}'
                          </p>
                        ))}
                    </div>
                  </>
                )}
                {!match.events || match.events.length === 0 && (
                  <p>No events recorded.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FixtureList;
