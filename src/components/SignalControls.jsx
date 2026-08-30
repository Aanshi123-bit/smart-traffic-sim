import React from 'react';

const SignalControls = ({ onSpawn, onExport, autoCycle, setAutoCycle, setSignals }) => {
  const setManualSignal = (road, state) => {
    setSignals((prev) => ({ ...prev, [road]: state }));
  };

  return (
    <div className="control-panel">
      <h3>System Controls</h3>
      <div className="button-group">
        <button className="btn btn-primary" onClick={onSpawn}>
          ➕ SPAWN VEHICLE
        </button>
        <button className="btn btn-success" onClick={onExport}>
          📊 EXPORT TRAFFIC DATA
        </button>
        <button 
          className={`btn ${autoCycle ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setAutoCycle(!autoCycle)}
        >
          {autoCycle ? '⏹ STOP AUTO CYCLE' : '▶ START AUTO CYCLE'}
        </button>
      </div>

      <h4 style={{ marginTop: '15px' }}>Manual Signal Override</h4>
      <div className="manual-controls">
        {['North', 'South', 'East', 'West'].map((dir) => (
          <div key={dir} className="road-control-row">
            <span>{dir}:</span>
            <button className="btn-mini red" onClick={() => setManualSignal(dir, 'RED')}>RED</button>
            <button className="btn-mini yellow" onClick={() => setManualSignal(dir, 'YELLOW')}>YEL</button>
            <button className="btn-mini green" onClick={() => setManualSignal(dir, 'GREEN')}>GRN</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignalControls;
