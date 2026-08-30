import React, { useState, useEffect } from 'react';
import Junction from './components/Junction';
import SignalControls from './components/SignalControls';
import StatisticsPanel from './components/StatisticsPanel';
import { spawnVehicle } from './utils/vehicleSpawner';
import { updateVehiclePositions } from './utils/vehicleMovement';
import { roadsDataGenerator } from './utils/roadsDataGenerator';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [autoCycle, setAutoCycle] = useState(true);
  const [signals, setSignals] = useState({
    North: 'GREEN',
    South: 'GREEN',
    East: 'RED',
    West: 'RED',
  });

  // Handle Signal Auto Cycle (North-South / East-West switching)
  useEffect(() => {
    if (!autoCycle) return;

    const interval = setInterval(() => {
      setSignals((prev) => {
        if (prev.North === 'GREEN') {
          return { North: 'YELLOW', South: 'YELLOW', East: 'RED', West: 'RED' };
        } else if (prev.North === 'YELLOW') {
          return { North: 'RED', South: 'RED', East: 'GREEN', West: 'GREEN' };
        } else if (prev.East === 'GREEN') {
          return { North: 'RED', South: 'RED', East: 'YELLOW', West: 'YELLOW' };
        } else {
          return { North: 'GREEN', South: 'GREEN', East: 'RED', West: 'RED' };
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [autoCycle]);

  // Main Simulation Loop
  useEffect(() => {
    const loop = setInterval(() => {
      setVehicles((prevVehicles) => updateVehiclePositions(prevVehicles, signals));
    }, 50);

    return () => clearInterval(loop);
  }, [signals]);

  const handleSpawn = () => {
    setVehicles((prev) => [...prev, spawnVehicle(prev.length)]);
  };

  const handleExportData = () => {
    const exportedData = roadsDataGenerator(vehicles);
    console.log('Python Traffic Analysis Module Input:', JSON.stringify(exportedData, null, 2));
    alert('Traffic Data exported to Console log successfully!');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>🚦 Smart India Hackathon - Smart Traffic Control Dashboard</h2>
      </header>
      <main className="dashboard-body">
        <div className="left-pane">
          <Junction vehicles={vehicles} signals={signals} />
        </div>
        <div className="right-pane">
          <StatisticsPanel vehicles={vehicles} />
          <SignalControls
            onSpawn={handleSpawn}
            onExport={handleExportData}
            autoCycle={autoCycle}
            setAutoCycle={setAutoCycle}
            setSignals={setSignals}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
