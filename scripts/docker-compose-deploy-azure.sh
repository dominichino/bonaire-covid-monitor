# Build and push to production environment
docker-compose build
docker tag bonaire-covid-monitor bonairecovidmonitor.azurecr.io/bonaire-covid-monitor:latest
docker push bonairecovidmonitor.azurecr.io/bonaire-covid-monitor:latest
