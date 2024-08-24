
docker build -t my-prometheus .
docker run -d --name prometheus --network monitoring -p 9090:9090 my-prometheus
#grafana
docker run -d --name=grafana --network monitoring -p 3000:3000 grafana/grafana

