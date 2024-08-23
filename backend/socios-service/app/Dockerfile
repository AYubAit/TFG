FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Copiar el script de entrada
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Establecer el script de entrada como el punto de entrada
ENTRYPOINT ["/entrypoint.sh"]

CMD ["flask", "run", "--host=0.0.0.0"]