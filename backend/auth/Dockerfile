# Usa una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de requisitos
COPY requirements.txt requirements.txt

# Instala las dependencias
RUN pip install -r requirements.txt

# Copia el archivo .env
COPY .env .env

# Copia el código de la aplicación
COPY . .

# Expone el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["python", "app/main.py"]