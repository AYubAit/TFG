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

# Añadir el directorio 'app' al PYTHONPATH
ENV PYTHONPATH=/app

# Expone el puerto
EXPOSE 5001

# Comando para ejecutar la aplicación
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:app"]
