# Build and push node config to production environment

# login
docker login bonairecovidmonitor.azurecr.io

# build
docker-compose -f build/docker/node/docker-compose.yml build

# tag and push
docker tag bonaire-covid-monitor bonairecovidmonitor.azurecr.io/bonaire-covid-monitor:latest
docker push bonairecovidmonitor.azurecr.io/bonaire-covid-monitor:latest
