# Guía de Limpieza Completa

Si sigues teniendo el error de incompatibilidad con Expo Go, sigue esta guía paso a paso.

## 🚨 Error: "Project is incompatible with this version of Expo Go"

### Opción 1: Script Automático (Recomendado)

```powershell
# 1. Obtener últimos cambios
git pull origin claude/uv-radiation-viewer-app-011CUp3MZvapcetiMrqJJiH7

# 2. Ejecutar script de limpieza
.\clean-install.ps1

# 3. Iniciar con caché limpio
npx expo start -c --port 8082
```

### Opción 2: Manual (Si el script no funciona)

**Paso 1: Cerrar todo**
```powershell
# Presiona Ctrl+C si Metro está corriendo
# Cierra VS Code o WebStorm si está abierto
```

**Paso 2: Obtener últimos cambios**
```powershell
git pull origin claude/uv-radiation-viewer-app-011CUp3MZvapcetiMrqJJiH7
```

**Paso 3: Detener procesos**
```powershell
# Mata todos los procesos de Node
Get-Process -Name "node" | Stop-Process -Force
```

**Paso 4: Eliminar todo**
```powershell
# Eliminar node_modules
rm -r -fo node_modules

# Eliminar .expo
rm -r -fo .expo

# Eliminar package-lock.json
rm -fo package-lock.json

# Limpiar caché npm
npm cache clean --force

# Limpiar caché de Expo (opcional pero recomendado)
rm -r -fo $env:LOCALAPPDATA\Expo
```

**Paso 5: Reinstalar**
```powershell
npm install
```

**Paso 6: Verificar versiones**
```powershell
npm list expo
# Debe mostrar: expo@54.0.x

npm list react-native
# Debe mostrar: react-native@0.76.5
```

**Paso 7: Iniciar limpio**
```powershell
npx expo start -c --port 8082
```

El flag `-c` es CRÍTICO, limpia toda la caché de Metro.

**Paso 8: En tu dispositivo móvil**
1. Cierra Expo Go completamente (desliza hacia arriba en iOS o usa "Forzar detención" en Android)
2. Verifica que tienes la última versión de Expo Go de la tienda
3. Abre Expo Go de nuevo
4. Escanea el código QR

## 🔍 Verificar qué versión está usando el proyecto

```powershell
# Ver app.json
cat app.json | Select-String "sdkVersion"
# Debe mostrar: "sdkVersion": "54.0.0"

# Ver package.json
cat package.json | Select-String "expo"
# Debe mostrar: "expo": "~54.0.0"
```

## 📱 Verificar Expo Go en tu dispositivo

Abre Expo Go → Ve a la pantalla de inicio → Deberías ver "SDK 54" en algún lugar.

Si dice "SDK 53" o menos, actualiza Expo Go desde:
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## ⚠️ Notas Importantes

1. **SIEMPRE usa el flag `-c`** al iniciar después de actualizaciones:
   ```powershell
   npx expo start -c --port 8082
   ```

2. **Si cambias de rama**, repite todo el proceso de limpieza.

3. **Si el error persiste**:
   - Desinstala Expo Go del dispositivo
   - Reinstala Expo Go desde la tienda
   - Repite los pasos de limpieza en tu computadora

## 🆘 Si Nada Funciona

Como último recurso:

```powershell
# 1. Clonar el repositorio en una carpeta nueva
cd ..
git clone <url-del-repo> app-indice-uv-clean
cd app-indice-uv-clean

# 2. Cambiar a la rama correcta
git checkout claude/uv-radiation-viewer-app-011CUp3MZvapcetiMrqJJiH7

# 3. Instalar y ejecutar
npm install
npx expo start -c --port 8082
```

Esto garantiza que no haya residuos de configuraciones anteriores.
