# Build static angular
# Copy static files to testcovidmonitor repo
# commit and push static files to testcovidmonitor repo

npm run build:prod
cp -Rv ./dist/bonaire-covid-monitor/browser/* ../testcovidmonitor

cd ../testcovidmonitor
git add -A
git commit -m "static files update from script(build-static-and-push-nginx-repo)"
git push