# Script de Limpieza Completa para Windows PowerShell
# Ejecutar este script para resolver problemas de caché e incompatibilidad

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Limpieza Completa - UV Radiation Viewer" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Detener procesos de Metro/Expo
Write-Host "1. Deteniendo procesos de Metro/Expo..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "   ✓ Procesos detenidos" -ForegroundColor Green
Write-Host ""

# 2. Eliminar node_modules
Write-Host "2. Eliminando node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Path "node_modules" -Recurse -Force
    Write-Host "   ✓ node_modules eliminado" -ForegroundColor Green
} else {
    Write-Host "   - node_modules no existe" -ForegroundColor Gray
}
Write-Host ""

# 3. Eliminar carpeta .expo
Write-Host "3. Eliminando caché de .expo..." -ForegroundColor Yellow
if (Test-Path ".expo") {
    Remove-Item -Path ".expo" -Recurse -Force
    Write-Host "   ✓ .expo eliminado" -ForegroundColor Green
} else {
    Write-Host "   - .expo no existe" -ForegroundColor Gray
}
Write-Host ""

# 4. Eliminar package-lock.json
Write-Host "4. Eliminando package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Remove-Item -Path "package-lock.json" -Force
    Write-Host "   ✓ package-lock.json eliminado" -ForegroundColor Green
} else {
    Write-Host "   - package-lock.json no existe" -ForegroundColor Gray
}
Write-Host ""

# 5. Limpiar caché de npm
Write-Host "5. Limpiando caché de npm..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "   ✓ Caché de npm limpiado" -ForegroundColor Green
Write-Host ""

# 6. Limpiar caché temporal de Expo
Write-Host "6. Limpiando caché temporal de Expo..." -ForegroundColor Yellow
$expoCache = "$env:LOCALAPPDATA\Expo"
if (Test-Path $expoCache) {
    Remove-Item -Path $expoCache -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✓ Caché de Expo limpiado" -ForegroundColor Green
} else {
    Write-Host "   - Caché de Expo no existe" -ForegroundColor Gray
}
Write-Host ""

# 7. Reinstalar dependencias
Write-Host "7. Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "   ✗ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}
Write-Host ""

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "✓ Limpieza completada exitosamente" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Ahora ejecuta:" -ForegroundColor Yellow
Write-Host "  npx expo start -c --port 8082" -ForegroundColor White
Write-Host ""
Write-Host "Y escanea el código QR con Expo Go" -ForegroundColor Yellow
Write-Host ""
