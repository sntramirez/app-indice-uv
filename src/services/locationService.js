import * as Location from 'expo-location';

/**
 * Solicita permisos de ubicación
 * @returns {Promise<boolean>} true si se concedieron los permisos
 */
export const requestLocationPermissions = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error al solicitar permisos de ubicación:', error);
    return false;
  }
};

/**
 * Obtiene la ubicación actual del usuario
 * @returns {Promise<Object>} Coordenadas de ubicación
 */
export const getCurrentLocation = async () => {
  try {
    // Solicitar permisos primero
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) {
      throw new Error('Se requieren permisos de ubicación para usar esta aplicación.');
    }

    // Obtener ubicación actual
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  } catch (error) {
    console.error('Error al obtener ubicación:', error);
    throw error;
  }
};

/**
 * Observa cambios en la ubicación del usuario
 * @param {Function} onLocationChange - Callback cuando cambia la ubicación
 * @returns {Object} Subscription object que se puede usar para detener el observador
 */
export const watchLocation = async (onLocationChange) => {
  try {
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) {
      throw new Error('Se requieren permisos de ubicación para usar esta aplicación.');
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 100, // Actualizar cada 100 metros
        timeInterval: 60000, // Actualizar cada minuto
      },
      (location) => {
        onLocationChange({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
        });
      }
    );

    return subscription;
  } catch (error) {
    console.error('Error al observar ubicación:', error);
    throw error;
  }
};

/**
 * Detiene el observador de ubicación
 * @param {Object} subscription - El objeto de suscripción devuelto por watchLocation
 */
export const stopWatchingLocation = (subscription) => {
  if (subscription) {
    subscription.remove();
  }
};
