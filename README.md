# UV Radiation Viewer

Una aplicación móvil de React Native para visualizar en tiempo real el índice de radiación UV basado en tu ubicación.

## 📱 Características

- **Visualización del Índice UV**: Muestra el índice UV actual con códigos de color según el nivel de riesgo
- **Geolocalización**: Detecta automáticamente tu ubicación para datos precisos
- **Categorías de Riesgo**: Clasifica el nivel UV (Bajo, Moderado, Alto, Muy Alto, Extremo)
- **Recomendaciones**: Proporciona consejos de protección según el nivel UV
- **Tiempos de Exposición Segura**: Calcula tiempos seguros de exposición según tipo de piel (Escala de Fitzpatrick)
- **Información Adicional**: Muestra datos de ozono, UV máximo del día y hora pico
- **Actualización Manual**: Pull-to-refresh para actualizar datos
- **Interfaz Intuitiva**: Diseño limpio y fácil de usar

## 🚀 Requisitos Previos

- Node.js >= 18
- npm o yarn
- Para Android:
  - Android Studio
  - SDK de Android (mínimo API 21)
  - Java Development Kit (JDK) 11 o superior
- Para iOS:
  - macOS
  - Xcode 12 o superior
  - CocoaPods

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/uv-radiation-viewer.git
cd uv-radiation-viewer
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configuración específica de plataforma

#### Android

No se requiere configuración adicional. El proyecto está listo para ejecutarse.

#### iOS

Instalar pods de CocoaPods:

```bash
cd ios
pod install
cd ..
```

## 🎯 Ejecución

### Android

```bash
# Iniciar Metro bundler
npm start

# En otra terminal, ejecutar en Android
npm run android
```

### iOS

```bash
# Iniciar Metro bundler
npm start

# En otra terminal, ejecutar en iOS
npm run ios
```

## 🔧 Configuración

### Modo Simulado vs API Real

Por defecto, la aplicación funciona en **modo simulado** que genera datos aleatorios de UV. Para usar una API real:

1. Regístrate en [OpenUV](https://www.openuv.io/) para obtener una API key gratuita
2. Abre `src/services/uvService.js`
3. Reemplaza `TU_API_KEY_AQUI` con tu API key
4. Comenta el código de "MODO SIMULADO" y descomenta el código de "CÓDIGO PARA API REAL"

```javascript
// En src/services/uvService.js
const API_KEY = 'tu-api-key-real';

// Comenta esta sección
/*
const simulatedData = {
  ...
};
*/

// Descomenta esta sección
const response = await axios.get(OPENUV_API_URL, {
  params: { lat: latitude, lng: longitude },
  headers: { 'x-access-token': API_KEY },
});
```

### Permisos

La aplicación requiere permiso de ubicación. Los permisos se solicitan automáticamente al iniciar:

- **Android**: `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`
- **iOS**: `NSLocationWhenInUseUsageDescription`

## 📖 Estructura del Proyecto

```
uv-radiation-viewer/
├── src/
│   ├── components/          # Componentes de React
│   │   ├── UVIndexDisplay.js       # Visualización principal del índice UV
│   │   ├── ExposureDetails.js      # Detalles de exposición segura
│   │   ├── LoadingScreen.js        # Pantalla de carga
│   │   └── ErrorScreen.js          # Pantalla de error
│   ├── services/           # Servicios de la aplicación
│   │   ├── uvService.js            # Servicio de datos UV
│   │   └── locationService.js      # Servicio de geolocalización
│   └── utils/              # Utilidades (futuro)
├── android/                # Código nativo de Android
├── ios/                    # Código nativo de iOS
├── App.js                  # Componente principal
├── index.js                # Punto de entrada
├── package.json            # Dependencias del proyecto
└── README.md              # Este archivo
```

## 🎨 Niveles de UV y Colores

| Índice UV | Nivel | Color | Recomendación |
|-----------|-------|-------|---------------|
| 0-2 | Bajo | Verde (#289500) | No se requiere protección |
| 3-5 | Moderado | Amarillo (#F7E400) | Usa protector solar |
| 6-7 | Alto | Naranja (#F85900) | Protección extra necesaria |
| 8-10 | Muy Alto | Rojo (#D8001D) | Evita exposición 10am-4pm |
| 11+ | Extremo | Violeta (#6B49C8) | Máxima protección |

## 🧪 Tipos de Piel (Escala de Fitzpatrick)

La aplicación calcula tiempos de exposición segura para 6 tipos de piel:

- **Tipo I**: Piel muy clara, siempre se quema
- **Tipo II**: Piel clara, usualmente se quema
- **Tipo III**: Piel media, a veces se quema
- **Tipo IV**: Piel morena clara, rara vez se quema
- **Tipo V**: Piel morena, muy rara vez se quema
- **Tipo VI**: Piel muy morena, nunca se quema

## 🐛 Solución de Problemas

### Error de permisos en Android

Si obtienes errores de permisos en Android:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Problemas con Metro Bundler

Si el bundler no se inicia correctamente:

```bash
npm start -- --reset-cache
```

### Errores en iOS con CocoaPods

```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

## 📱 Capturas de Pantalla

(Agrega capturas aquí cuando tengas la app funcionando)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔗 Enlaces Útiles

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [OpenUV API](https://www.openuv.io/)
- [WHO UV Index Guide](https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index)

## 👨‍💻 Autor

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

## 🙏 Agradecimientos

- Datos de UV proporcionados por OpenUV API
- Iconos y emojis de Unicode
- Comunidad de React Native
