import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {formatExposureTime} from '../services/uvService';

/**
 * Componente que muestra detalles sobre tiempos de exposición segura
 * según tipos de piel (Escala de Fitzpatrick)
 */
const ExposureDetails = ({exposureData, ozone, uvMax, uvMaxTime}) => {
  const skinTypes = [
    {type: 'I', description: 'Piel muy clara', time: exposureData?.st1},
    {type: 'II', description: 'Piel clara', time: exposureData?.st2},
    {type: 'III', description: 'Piel media', time: exposureData?.st3},
    {type: 'IV', description: 'Piel morena clara', time: exposureData?.st4},
    {type: 'V', description: 'Piel morena', time: exposureData?.st5},
    {type: 'VI', description: 'Piel muy morena', time: exposureData?.st6},
  ];

  const formatMaxTime = timeString => {
    if (!timeString) return 'N/A';
    const date = new Date(timeString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Información Adicional</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>UV Máximo</Text>
            <Text style={styles.infoValue}>{uvMax?.toFixed(1) || 'N/A'}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Hora del pico</Text>
            <Text style={styles.infoValue}>{formatMaxTime(uvMaxTime)}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Ozono (DU)</Text>
            <Text style={styles.infoValue}>{ozone?.toFixed(0) || 'N/A'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏱️ Tiempo de Exposición Segura</Text>
        <Text style={styles.sectionSubtitle}>
          Tiempo máximo sin protección antes de quemaduras
        </Text>

        {skinTypes.map((skin, index) => (
          <View key={index} style={styles.skinTypeRow}>
            <View style={styles.skinTypeInfo}>
              <Text style={styles.skinTypeLabel}>Tipo {skin.type}</Text>
              <Text style={styles.skinTypeDescription}>{skin.description}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeValue}>
                {skin.time ? formatExposureTime(skin.time) : 'N/A'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          💡 Nota: Estos tiempos son aproximados. Siempre es recomendable usar
          protector solar independientemente del tipo de piel.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 6,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  skinTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  skinTypeInfo: {
    flex: 1,
  },
  skinTypeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 3,
  },
  skinTypeDescription: {
    fontSize: 13,
    color: '#888888',
  },
  timeContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  timeValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
  },
  noteContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  noteText: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 20,
  },
});

export default ExposureDetails;
