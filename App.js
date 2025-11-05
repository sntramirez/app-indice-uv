import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import UVIndexDisplay from './src/components/UVIndexDisplay';
import ExposureDetails from './src/components/ExposureDetails';
import LoadingScreen from './src/components/LoadingScreen';
import ErrorScreen from './src/components/ErrorScreen';
import {getCurrentLocation} from './src/services/locationService';
import {getUVData} from './src/services/uvService';

/**
 * Componente principal de la aplicación UV Radiation Viewer
 */
const App = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [uvData, setUvData] = useState(null);
  const [location, setLocation] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  /**
   * Carga los datos de UV basados en la ubicación actual
   */
  const loadUVData = async () => {
    try {
      setError(null);

      // Obtener ubicación actual (expo-location maneja permisos automáticamente)
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Obtener datos de UV
      const result = await getUVData(
        currentLocation.latitude,
        currentLocation.longitude
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      setUvData(result.data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError(err.message || 'Error al cargar los datos de UV');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Maneja el pull-to-refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    loadUVData();
  };

  /**
   * Carga inicial de datos
   */
  useEffect(() => {
    loadUVData();
  }, []);

  /**
   * Formatea la fecha de última actualización
   */
  const formatLastUpdate = () => {
    if (!lastUpdate) return '';
    return lastUpdate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Pantalla de carga inicial
  if (loading) {
    return <LoadingScreen message="Obteniendo datos de radiación UV..." />;
  }

  // Pantalla de error
  if (error) {
    return (
      <ErrorScreen
        message={error}
        onRetry={() => {
          setLoading(true);
          loadUVData();
        }}
      />
    );
  }

  // Pantalla principal
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6B49C8']}
            tintColor="#6B49C8"
          />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>☀️ Radiación UV</Text>
          {location && (
            <Text style={styles.subtitle}>
              📍 Lat: {location.latitude.toFixed(4)}, Lon:{' '}
              {location.longitude.toFixed(4)}
            </Text>
          )}
          {lastUpdate && (
            <Text style={styles.updateText}>
              Última actualización: {formatLastUpdate()}
            </Text>
          )}
        </View>

        {uvData && (
          <>
            <UVIndexDisplay uvIndex={uvData.uv} />

            <ExposureDetails
              exposureData={uvData.safe_exposure_time}
              ozone={uvData.ozone}
              uvMax={uvData.uv_max}
              uvMaxTime={uvData.uv_max_time}
            />
          </>
        )}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Text style={styles.refreshButtonText}>🔄 Actualizar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 4,
  },
  updateText: {
    fontSize: 12,
    color: '#AAAAAA',
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: '#6B49C8',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#6B49C8',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
