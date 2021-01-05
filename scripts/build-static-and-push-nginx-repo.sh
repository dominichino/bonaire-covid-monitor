# Build static angular
# Copy static files to covidmonitorbonaire repo
# commit and push static files to covidmonitorbonaire repo

npm run build:prod
cp -Rv ./dist/bonaire-covid-monitor/browser/* ../covidmonitorbonaire

cd ../covidmonitorbonaire
git add -A
git commit -m "static files update from script(build-static-and-push-nginx-repo)"
git push
