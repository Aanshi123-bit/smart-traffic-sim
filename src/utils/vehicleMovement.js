const SAFE_DISTANCE = 45; // Minimum pixels between vehicles
const JUNCTION_BOUNDS = { minX: 250, maxX: 350, minY: 250, maxY: 350 };

export const updateVehiclePositions = (vehicles, signals) => {
  return vehicles.map((vehicle) => {
    let updatedVehicle = { ...vehicle };

    // 1. Check Junction Crossing Status
    if (!updatedVehicle.hasCrossedJunction) {
      if (
        (updatedVehicle.direction === 'South' && updatedVehicle.y > JUNCTION_BOUNDS.minY) ||
        (updatedVehicle.direction === 'North' && updatedVehicle.y < JUNCTION_BOUNDS.maxY) ||
        (updatedVehicle.direction === 'East' && updatedVehicle.x > JUNCTION_BOUNDS.minX) ||
        (updatedVehicle.direction === 'West' && updatedVehicle.x < JUNCTION_BOUNDS.maxX)
      ) {
        updatedVehicle.hasCrossedJunction = true;
      }
    }

    // 2. Determine Speed based on Signal state if vehicle hasn't crossed stop line
    const signalState = signals[updatedVehicle.road];
    let speedMultiplier = 1;

    if (!updatedVehicle.hasCrossedJunction) {
      const isNearStopLine = isApproachingStopLine(updatedVehicle);
      if (isNearStopLine) {
        if (signalState === 'RED') speedMultiplier = 0;
        if (signalState === 'YELLOW') speedMultiplier = 0.4;
      }
    }

    // 3. Collision Avoidance (Safe Distance Check)
    const vehicleAhead = getVehicleAhead(updatedVehicle, vehicles);
    if (vehicleAhead) {
      const dist = getDistance(updatedVehicle, vehicleAhead);
      if (dist < SAFE_DISTANCE) {
        speedMultiplier = 0; // Stop if too close to vehicle ahead
      }
    }

    // 4. Update Position Coordinates
    const currentSpeed = updatedVehicle.baseSpeed * speedMultiplier;
    switch (updatedVehicle.direction) {
      case 'South': updatedVehicle.y += currentSpeed; break;
      case 'North': updatedVehicle.y -= currentSpeed; break;
      case 'East':  updatedVehicle.x += currentSpeed; break;
      case 'West':  updatedVehicle.x -= currentSpeed; break;
      default: break;
    }

    return updatedVehicle;
  }).filter(v => v.x >= -50 && v.x <= 650 && v.y >= -50 && v.y <= 650); // Remove off-screen vehicles
};

const isApproachingStopLine = (v) => {
  if (v.direction === 'South') return v.y >= 200 && v.y < 245;
  if (v.direction === 'North') return v.y <= 400 && v.y > 355;
  if (v.direction === 'East')  return v.x >= 200 && v.x < 245;
  if (v.direction === 'West')  return v.x <= 400 && v.x > 355;
  return false;
};

const getVehicleAhead = (current, allVehicles) => {
  return allVehicles.find((other) => {
    if (other.vehicle_id === current.vehicle_id || other.road !== current.road) return false;
    if (current.direction === 'South') return other.y > current.y && (other.y - current.y) < SAFE_DISTANCE + 20;
    if (current.direction === 'North') return other.y < current.y && (current.y - other.y) < SAFE_DISTANCE + 20;
    if (current.direction === 'East')  return other.x > current.x && (other.x - current.x) < SAFE_DISTANCE + 20;
    if (current.direction === 'West')  return other.x < current.x && (current.x - other.x) < SAFE_DISTANCE + 20;
    return false;
  });
};

const getDistance = (v1, v2) => {
  return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
};
