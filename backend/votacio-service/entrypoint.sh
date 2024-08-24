#!/bin/sh


exec "$@"

# Verificar si la variable de entorno VOTACIO_PORT está definida
if [ -z "$VOTACIO_PORT" ]; then
  echo "VOTACIO_PORT no está definida. Usando el puerto por defecto 5000."
  VOTACIO_PORT=5000
fi

# Ejecutar el comando flask run con el puerto especificado
exec flask run --host=0.0.0.0 --port=$VOTACIO_PORT