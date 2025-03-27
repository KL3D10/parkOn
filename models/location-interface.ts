export interface LocationDTO {
    coords: Coords;
    timestamp: number;
  }
  
  export interface Coords {
    accuracy: number;
    altitude: number;
    altitudeAccuracy: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  }