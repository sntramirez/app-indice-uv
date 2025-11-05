import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getUVRiskCategory} from '../services/uvService';

/**
 * Componente que muestra el índice UV actual de forma visual
 */
const UVIndexDisplay = ({uvIndex}) => {
  const riskCategory = getUVRiskCategory(uvIndex);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.uvCircle,
          {backgroundColor: riskCategory.color, shadowColor: riskCategory.color},
        ]}>
        <Text style={styles.uvValue}>{uvIndex.toFixed(1)}</Text>
        <Text style={styles.uvLabel}>UV</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.levelText}>{riskCategory.level}</Text>
        <Text style={styles.descriptionText}>{riskCategory.description}</Text>
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationIcon}>ℹ️</Text>
          <Text style={styles.recommendationText}>
            {riskCategory.recommendation}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  uvCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 30,
  },
  uvValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  uvLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 5,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendationContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
  recommendationIcon: {
    fontSize: 20,
    marginRight: 10,
    marginTop: 2,
  },
  recommendationText: {
    fontSize: 14,
    color: '#444444',
    flex: 1,
    lineHeight: 20,
  },
});

export default UVIndexDisplay;
