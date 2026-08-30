export const roadsDataGenerator = (vehicles) => {
  const directions = ['North', 'South', 'East', 'West'];
  const formattedData = {};

  directions.forEach((dir) => {
    formattedData[dir] = {
      road_length: 300,
      lane_count: 2,
      vehicles: vehicles
        .filter((v) => v.road === dir)
        .map(({ vehicle_id, vehicle_type, road, lane, direction, x, y, speed, arrival_time, hasCrossedJunction }) => ({
          vehicle_id,
          vehicle_type,
          road,
          lane,
          direction,
          x: Math.round(x),
          y: Math.round(y),
          speed,
          arrival_time,
          hasCrossedJunction,
        })),
    };
  });

  return formattedData;
};
