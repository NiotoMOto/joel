FROM mhart/alpine-node:6.5.0
ENV HOME=/home/app
WORKDIR $HOME/
# Install ssh
RUN apk upgrade --update

# Bundle app source
COPY node_modules $HOME/wetty6/node_modules
COPY server $HOME/server
COPY index.js $HOME/
COPY package.json $HOME/wetty6
RUN npm prune --production
USER wetty6
ENTRYPOINT  [ "npm", "start" ]
