import React from 'react';

const TrafficLight = ({ direction, state }) => {
  return (
    <div className={`traffic-light light-${direction.toLowerCase()}`}>
      <span className="light-label">{direction}</span>
      <div className="light-box">
        <div className={`circle red ${state === 'RED' ? 'active' : ''}`} />
        <div className={`circle yellow ${state === 'YELLOW' ? 'active' : ''}`} />
        <div className={`circle green ${state === 'GREEN' ? 'active' : ''}`} />
      </div>
    </div>
  );
};

export default TrafficLight;
