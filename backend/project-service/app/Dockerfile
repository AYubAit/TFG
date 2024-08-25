# Imagen base de Go
FROM golang:1.20

WORKDIR /app

# Copiar archivos necesarios
COPY .env ./.env
COPY . .

# Inicializar el módulo Go y descargar dependencias
RUN go mod init proyectos
RUN go mod tidy
RUN go get github.com/joho/godotenv
RUN go get github.com/gin-gonic/gin
RUN go get github.com/prometheus/client_golang/prometheus/promhttp


# Compilar la aplicación
RUN go build -o main .

# Comando para ejecutar la aplicación
CMD ["./main"]
