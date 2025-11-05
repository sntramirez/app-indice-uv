# Solución de Problemas - Error TurboModuleRegistry

Si encuentras el error:
```
TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not be found
```

Sigue estos pasos en orden:

## 1. Detener el servidor
Presiona `Ctrl+C` en la terminal donde está corriendo Metro Bundler

## 2. Limpiar todo (IMPORTANTE)

```powershell
# Eliminar node_modules
rm -r -fo node_modules

# Limpiar caché de npm
npm cache clean --force

# Si tienes Watchman instalado (opcional)
watchman watch-del-all
```

## 3. Reinstalar dependencias

```powershell
# Instalar todas las dependencias frescas
npm install
```

## 4. Limpiar caché de Expo/Metro

```powershell
# Iniciar con caché limpio
npx expo start -c --port 8082
```

## 5. Reiniciar Expo Go en tu dispositivo

- **Android**: Forzar cierre de Expo Go desde Ajustes → Aplicaciones → Expo Go → Forzar detención
- **iOS**: Deslizar hacia arriba y cerrar Expo Go completamente

## 6. Volver a escanear el QR

Abre Expo Go de nuevo y escanea el código QR que aparece en la terminal.

---

## Si el problema persiste

### Verificar versiones instaladas

```powershell
npm list expo
npm list react-native
```

Deberías ver:
- expo@~54.0.x
- react-native@0.76.5

### Reinstalar Expo CLI globalmente

```powershell
npm uninstall -g expo-cli
npm install -g expo-cli@latest
```

### Verificar Expo Go en tu dispositivo

Asegúrate de tener la última versión:
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
- iOS: https://apps.apple.com/app/expo-go/id982107779

La app debe mostrar "SDK 54" cuando la abras.

---

## Causa del error

Este error ocurre cuando:
1. Los módulos nativos de React Native no están correctamente enlazados
2. Hay caché corrupto de Metro Bundler
3. Incompatibilidad de versiones entre dependencias
4. Expo Go en el dispositivo es de una versión diferente al proyecto

La solución más efectiva es **limpiar todo y reinstalar** (pasos 1-4 arriba).
