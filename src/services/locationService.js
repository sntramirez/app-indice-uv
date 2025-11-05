import Geolocation from '@react-native-community/geolocation';

/**
 * Obtiene la ubicación actual del usuario
 * @returns {Promise<Object>} Coordenadas de ubicación
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        console.error('Error al obtener ubicación:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};

/**
 * Observa cambios en la ubicación del usuario
 * @param {Function} onLocationChange - Callback cuando cambia la ubicación
 * @returns {number} ID del watcher para poder detenerlo después
 */
export const watchLocation = onLocationChange => {
  return Geolocation.watchPosition(
    position => {
      onLocationChange({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    },
    error => {
      console.error('Error al observar ubicación:', error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: 100, // Actualizar cada 100 metros
      interval: 60000, // Actualizar cada minuto
    }
  );
};

/**
 * Detiene el observador de ubicación
 * @param {number} watchId - ID del watcher a detener
 */
export const stopWatchingLocation = watchId => {
  Geolocation.clearWatch(watchId);
};
