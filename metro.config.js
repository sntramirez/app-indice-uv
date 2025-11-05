const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configurar puerto personalizado
config.server = {
  port: 8082,
};

module.exports = config;
