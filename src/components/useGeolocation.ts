import { useState, useEffect } from "react";

export interface GeolocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const useGeolocation = (options = {}) => {
  const [location, setLocation] = useState<GeolocationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    let watchId: number;

    const geo = navigator.geolocation;

    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      if (!canceled) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setError(null);
      }
    };

    const onError = (error: GeolocationPositionError) => {
      if (!canceled) {
        setError(error.message);
      }
    };

    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
      ...options,
    };

    watchId = geo.watchPosition(onSuccess, onError, geoOptions);

    return () => {
      canceled = true;
      geo.clearWatch(watchId);
    };
  }, [options]);

  return { location, error };
};

export default useGeolocation;
