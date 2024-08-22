FROM alpine:latest

RUN apk --no-cache add sqlite

WORKDIR /db

COPY init.sql /db/

CMD ["sqlite3", "/db/socis.db", ".read /db/init.sql"]