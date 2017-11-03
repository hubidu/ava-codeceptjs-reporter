docker build -t e2e-reporter . || exit 1
docker run -d --restart unless-stopped -p 4000:4000 -v /var/atlassian/application-data/e2e/out:/opt/e2e/__out -it e2e-reporter || exit 1
