FROM mhart/alpine-node:6.5.0
ENV HOME=/home/app
WORKDIR $HOME/
# Install ssh
RUN apk upgrade --update

# Bundle app source
COPY node_modules $HOME/node_modules
COPY server $HOME/server
COPY index.js $HOME/
COPY package.json $HOME/
RUN npm prune --production
ENTRYPOINT  [ "npm", "start" ]
