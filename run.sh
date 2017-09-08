docker build -t e2e-reporter . || exit 1
docker run  -p 4000:4000 -v /opt/e2e/out:/opt/e2e/__out -it e2e-reporter || exit 1