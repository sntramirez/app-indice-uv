# UV Radiation Viewer

Una aplicación móvil de React Native con Expo para visualizar en tiempo real el índice de radiación UV basado en tu ubicación.

## 📱 Características

- **Visualización del Índice UV**: Muestra el índice UV actual con códigos de color según el nivel de riesgo
- **Geolocalización**: Detecta automáticamente tu ubicación para datos precisos
- **Categorías de Riesgo**: Clasifica el nivel UV (Bajo, Moderado, Alto, Muy Alto, Extremo)
- **Recomendaciones**: Proporciona consejos de protección según el nivel UV
- **Tiempos de Exposición Segura**: Calcula tiempos seguros de exposición según tipo de piel (Escala de Fitzpatrick)
- **Información Adicional**: Muestra datos de ozono, UV máximo del día y hora pico
- **Actualización Manual**: Pull-to-refresh para actualizar datos
- **Interfaz Intuitiva**: Diseño limpio y fácil de usar
- **Multiplataforma**: Funciona en Android, iOS y Web con Expo Go

## 🚀 Requisitos Previos

- Node.js >= 18
- npm o yarn
- **Expo Go** instalado en tu dispositivo móvil:
  - [Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent) (Google Play Store)
  - [Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779) (App Store)

**No necesitas Android Studio, Xcode, ni configuración de entorno nativo. ¡Expo Go lo hace todo por ti!**

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

Eso es todo. No se requiere configuración adicional.

## 🎯 Ejecución con Expo Go

### Método 1: Escanear código QR (Recomendado)

1. **Iniciar el servidor de desarrollo:**

```bash
npm start
```

2. **Escanear el código QR:**
   - **Android**: Abre la app Expo Go y escanea el código QR que aparece en la terminal o navegador
   - **iOS**: Abre la cámara del iPhone y escanea el código QR, luego toca la notificación para abrir en Expo Go

3. ¡Listo! La app se cargará automáticamente en tu dispositivo

### Método 2: Ejecutar directamente

```bash
# Para Android
npm run android

# Para iOS (solo en Mac)
npm run ios

# Para Web
npm run web
```

### Notas Importantes

- **Puerto personalizado**: El servidor de desarrollo está configurado para usar el puerto **8082** en lugar del 8081
- **Misma red WiFi**: Asegúrate de que tu computadora y dispositivo móvil estén en la misma red WiFi
- **Permisos**: La app solicitará permisos de ubicación automáticamente al iniciar
- **Hot Reload**: Los cambios en el código se reflejarán automáticamente en tu dispositivo

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

### No puedo conectar con Expo Go

**Problema**: No aparece el código QR o no puedo conectar desde mi dispositivo

**Solución**:
1. Asegúrate de que tu computadora y móvil están en la misma red WiFi
2. Si usas VPN, desactívala temporalmente
3. Reinicia el servidor: presiona `Ctrl+C` y ejecuta `npm start` de nuevo
4. Intenta con el modo túnel: `npx expo start --tunnel`

### Error de permisos de ubicación

**Problema**: La app no puede obtener mi ubicación

**Solución**:
1. Asegúrate de haber dado permisos de ubicación a Expo Go en la configuración de tu dispositivo
2. En Android: Ve a Ajustes → Aplicaciones → Expo Go → Permisos → Ubicación → Permitir
3. En iOS: Ve a Ajustes → Expo Go → Ubicación → Mientras se usa la app

### Limpiar caché de Expo

Si tienes problemas con el bundler o la app no actualiza:

```bash
npx expo start -c
```

O con npm:

```bash
npm start -- -c
```

### La app se cierra o crashea

1. Revisa la consola de Expo para ver errores
2. Asegúrate de que todas las dependencias están instaladas: `npm install`
3. Limpia el caché: `npx expo start -c`
4. Actualiza Expo Go a la última versión en tu dispositivo

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

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Go App](https://expo.dev/client)
- [expo-location Documentation](https://docs.expo.dev/versions/latest/sdk/location/)
- [OpenUV API](https://www.openuv.io/)
- [WHO UV Index Guide](https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index)

## 👨‍💻 Autor

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

## 🙏 Agradecimientos

- Datos de UV proporcionados por OpenUV API
- Iconos y emojis de Unicode
- Expo team por simplificar el desarrollo móvil
- Comunidad de React Native y Expo
