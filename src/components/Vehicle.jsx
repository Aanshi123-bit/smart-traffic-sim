import React from 'react';

const Vehicle = ({ data }) => {
  return (
    <div
      className="vehicle"
      style={{
        left: `${data.x}px`,
        top: `${data.y}px`,
      }}
      title={`${data.vehicle_type} (${data.vehicle_id})`}
    >
      {data.emoji}
    </div>
  );
};

export default Vehicle;
