import React from 'react';

const StatisticsPanel = ({ vehicles }) => {
  const getCountByRoad = (road) => vehicles.filter((v) => v.road === road).length;

  return (
    <div className="stats-panel">
      <h3>Live Traffic Analytics</h3>
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-value">{getCountByRoad('North')}</span>
          <span className="stat-label">North</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{getCountByRoad('South')}</span>
          <span className="stat-label">South</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{getCountByRoad('East')}</span>
          <span className="stat-label">East</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{getCountByRoad('West')}</span>
          <span className="stat-label">West</span>
        </div>
      </div>
      <div className="stat-total">
        TOTAL VEHICLES IN SYSTEM: <span>{vehicles.length}</span>
      </div>
    </div>
  );
};

export default StatisticsPanel;
