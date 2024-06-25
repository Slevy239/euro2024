// ResultList.js (or whatever your component file name is)
import React from 'react';

function ResultList({ results }) {
  return (
    <div className="result-list">
      {results && results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              {/* Render your result item here */}
              <p>{result.someProperty}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results available</p>
      )}
    </div>
  );
}

export default ResultList;
