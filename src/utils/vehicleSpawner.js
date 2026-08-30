const VEHICLE_TYPES = [
  { type: 'Car', emoji: '🚗', speed: 3 },
  { type: 'Bike', emoji: '🏍️', speed: 4 },
  { type: 'Auto', emoji: '🛺', speed: 2.5 },
  { type: 'Bus', emoji: '🚌', speed: 2 },
  { type: 'Truck', emoji: '🚛', speed: 1.8 },
];

const ROADS = ['North', 'South', 'East', 'West'];

// Coordinates relative to a 600x600 canvas (Junction center 250-350)
const SPAWN_CONFIGS = {
  North: { x: 275, y: 0, direction: 'South', lane: 1 },
  South: { x: 315, y: 600, direction: 'North', lane: 1 },
  East: { x: 600, y: 275, direction: 'West', lane: 1 },
  West: { x: 0, y: 315, direction: 'East', lane: 1 },
};

export const spawnVehicle = (existingVehiclesCount) => {
  const vehicleConfig = VEHICLE_TYPES[Math.floor(Math.random() * VEHICLE_TYPES.length)];
  const road = ROADS[Math.floor(Math.random() * ROADS.length)];
  const spawnPoint = SPAWN_CONFIGS[road];

  return {
    vehicle_id: `v_${Date.now()}_${existingVehiclesCount}`,
    vehicle_type: vehicleConfig.type,
    emoji: vehicleConfig.emoji,
    road: road,
    lane: spawnPoint.lane,
    direction: spawnPoint.direction,
    x: spawnPoint.x,
    y: spawnPoint.y,
    speed: vehicleConfig.speed,
    baseSpeed: vehicleConfig.speed,
    arrival_time: new Date().toISOString(),
    hasCrossedJunction: false,
  };
};
