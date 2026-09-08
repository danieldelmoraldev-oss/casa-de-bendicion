#!/usr/bin/env bash
# Compila y publica el sitio estático en un servidor con Docker.
#
#   export CDB_HOST=usuario@mi-servidor     # destino SSH (con clave, sin password)
#   export CDB_PORT=8082                    # puerto publicado (opcional)
#   ./deploy.sh
#
# El contenido se monta como volumen, así que basta con reemplazar los
# ficheros: nginx los sirve al vuelo, sin reiniciar nada. Sólo se recrea
# el contenedor si han cambiado docker-compose.yml o nginx.conf.
set -euo pipefail

HOST="${CDB_HOST:?Falta CDB_HOST. Ejemplo: export CDB_HOST=usuario@mi-servidor}"
PORT="${CDB_PORT:-8082}"
REMOTE_DIR="apps/casa-de-bendicion"
ARCHIVE="dist.tar.gz"

echo "▸ Compilando…"
npm run build

echo "▸ Subiendo a $HOST…"
tar -czf "$ARCHIVE" -C dist .
ssh "$HOST" "mkdir -p ~/$REMOTE_DIR"
scp -q "$ARCHIVE" docker-compose.yml nginx.conf "$HOST:~/$REMOTE_DIR/"
rm -f "$ARCHIVE"

echo "▸ Publicando…"
ssh "$HOST" "set -e
  cd ~/$REMOTE_DIR
  # Vaciar el CONTENIDO de dist, nunca la carpeta: está montada como
  # volumen y recrearla dejaría al contenedor apuntando al inodo viejo.
  mkdir -p dist
  find dist -mindepth 1 -delete
  tar -xzf $ARCHIVE -C dist && rm -f $ARCHIVE
  docker compose up -d --quiet-pull >/dev/null 2>&1"

echo "▸ Comprobando…"
if ssh "$HOST" "curl -sf -o /dev/null http://localhost:$PORT/"; then
  echo "  HTTP 200"
else
  # Red de seguridad: si el volumen se hubiera quedado desenlazado
  # (p. ej. alguien borró la carpeta dist en vez de su contenido),
  # recrear el contenedor lo vuelve a montar.
  echo "  ✗ No responde. Recreando el contenedor…"
  ssh "$HOST" "cd ~/$REMOTE_DIR && docker compose up -d --force-recreate >/dev/null 2>&1"
  sleep 3
  ssh "$HOST" "curl -sf -o /dev/null http://localhost:$PORT/" || {
    echo "  ✗ Sigue sin responder. Revisa: ssh \$CDB_HOST 'docker logs casa-de-bendicion'"
    exit 1
  }
  echo "  HTTP 200 (tras recrear)"
fi

echo "✓ Publicado en el puerto $PORT de $HOST"
