FROM node:lts as build

RUN npm install -g --unsafe-perm node-red

WORKDIR /root/.node-red
#RUN npm install node-red-contrib-image-tools
#RUN npm install node-red-contrib-ui-media
RUN npm install node-red-node-swagger

# RUN which node-red
#RUN ls /usr/local/bin/node-red
#WORKDIR /usr/local/bin/node-red
#RUN ls -al

COPY docker-flow.json  /root/.node-red/flows.json
#COPY flows_cred.json /root/.node-red/flows_cred.json
COPY docker-settings.js /root/.node-red/settings.js

CMD ["node-red"]