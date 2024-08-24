# Usa la imagen oficial de PostgreSQL versión 13
FROM postgres:13

# Copia el script de inicialización al contenedor
COPY init.sql /docker-entrypoint-initdb.d/

CMD ["-p", "5433"]