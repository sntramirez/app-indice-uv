import axios from 'axios';

/**
 * Servicio para obtener datos de radiación UV
 *
 * Para usar una API real como OpenUV:
 * 1. Registrarse en https://www.openuv.io/ para obtener una API key
 * 2. Agregar la API key en un archivo .env
 * 3. Descomentar el código de la API real y comentar el código simulado
 */

const OPENUV_API_URL = 'https://api.openuv.io/api/v1/uv';
// Descomentar y agregar tu API key real aquí
// const API_KEY = 'TU_API_KEY_AQUI';

/**
 * Obtiene datos de radiación UV basados en coordenadas
 * @param {number} latitude - Latitud
 * @param {number} longitude - Longitud
 * @returns {Promise<Object>} Datos de radiación UV
 */
export const getUVData = async (latitude, longitude) => {
  try {
    // MODO SIMULADO - Genera datos de ejemplo
    // Para usar API real, comenta esta sección y descomenta la siguiente

    const simulatedData = {
      uv: parseFloat((Math.random() * 11).toFixed(1)), // UV índice entre 0-11
      uv_max: parseFloat((Math.random() * 11 + 1).toFixed(1)),
      uv_max_time: new Date().toISOString(),
      ozone: parseFloat((Math.random() * 100 + 250).toFixed(1)),
      safe_exposure_time: {
        st1: Math.floor(Math.random() * 60) + 10,
        st2: Math.floor(Math.random() * 90) + 20,
        st3: Math.floor(Math.random() * 120) + 30,
        st4: Math.floor(Math.random() * 150) + 40,
        st5: Math.floor(Math.random() * 180) + 50,
        st6: Math.floor(Math.random() * 240) + 60,
      },
    };

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      data: simulatedData,
      location: {
        latitude,
        longitude,
      },
    };

    /*
    // CÓDIGO PARA API REAL - Descomentar para usar OpenUV API
    const response = await axios.get(OPENUV_API_URL, {
      params: {
        lat: latitude,
        lng: longitude,
      },
      headers: {
        'x-access-token': API_KEY,
      },
    });

    return {
      success: true,
      data: response.data.result,
      location: {
        latitude,
        longitude,
      },
    };
    */
  } catch (error) {
    console.error('Error al obtener datos de UV:', error);
    return {
      success: false,
      error: error.message || 'Error al obtener datos de UV',
    };
  }
};

/**
 * Obtiene la categoría de riesgo basada en el índice UV
 * @param {number} uvIndex - Índice UV
 * @returns {Object} Categoría de riesgo con color y descripción
 */
export const getUVRiskCategory = uvIndex => {
  if (uvIndex <= 2) {
    return {
      level: 'Bajo',
      color: '#289500',
      description: 'No se requiere protección',
      recommendation: 'Puedes estar afuera sin protección.',
    };
  } else if (uvIndex <= 5) {
    return {
      level: 'Moderado',
      color: '#F7E400',
      description: 'Protección requerida',
      recommendation: 'Usa protector solar, sombrero y gafas de sol.',
    };
  } else if (uvIndex <= 7) {
    return {
      level: 'Alto',
      color: '#F85900',
      description: 'Se necesita protección extra',
      recommendation: 'Reduce exposición al sol entre 10am y 4pm. Usa protección.',
    };
  } else if (uvIndex <= 10) {
    return {
      level: 'Muy Alto',
      color: '#D8001D',
      description: 'Se requiere protección especial',
      recommendation: 'Evita el sol entre 10am y 4pm. Se requiere protección completa.',
    };
  } else {
    return {
      level: 'Extremo',
      color: '#6B49C8',
      description: 'Máxima protección necesaria',
      recommendation: 'Evita el sol. Se requiere toda la protección posible.',
    };
  }
};

/**
 * Formatea el tiempo de exposición segura
 * @param {number} minutes - Minutos de exposición segura
 * @returns {string} Tiempo formateado
 */
export const formatExposureTime = minutes => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
};
