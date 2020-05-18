FROM node:12-slim
COPY ../../package.json /src/package.json
RUN  cd /src; npm install --silent
COPY ../.. /src
EXPOSE 3000
WORKDIR /src

CMD npm run start