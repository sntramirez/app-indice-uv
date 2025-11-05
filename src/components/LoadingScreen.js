import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

/**
 * Componente de pantalla de carga
 */
const LoadingScreen = ({message = 'Cargando...'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6B49C8" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
  },
});

export default LoadingScreen;
