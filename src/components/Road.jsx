import React from 'react';

const Road = () => {
  return (
    <div className="road-network">
      <div className="vertical-road">
        <div className="lane-divider-v" />
      </div>
      <div className="horizontal-road">
        <div className="lane-divider-h" />
      </div>
      <div className="intersection" />
      
      {/* Stop lines before intersection */}
      <div className="stop-line stop-north" />
      <div className="stop-line stop-south" />
      <div className="stop-line stop-east" />
      <div className="stop-line stop-west" />
    </div>
  );
};

export default Road;
