import React from 'react';
import Road from './Road';
import TrafficLight from './TrafficLight';
import Vehicle from './Vehicle';

const Junction = ({ vehicles, signals }) => {
  return (
    <div className="junction-canvas">
      <Road />
      
      {/* Traffic Lights */}
      <TrafficLight direction="North" state={signals.North} />
      <TrafficLight direction="South" state={signals.South} />
      <TrafficLight direction="East" state={signals.East} />
      <TrafficLight direction="West" state={signals.West} />

      {/* Render Active Vehicles */}
      {vehicles.map((v) => (
        <Vehicle key={v.vehicle_id} data={v} />
      ))}
    </div>
  );
};

export default Junction;
