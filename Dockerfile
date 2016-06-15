FROM docker-dev.etf1.tf1.fr:5000/exploitation/node6

# Environnement forcé en mode production
ENV NODE_ENV production

RUN apk update && \
    apk add python && \
    apk add g++ && \
    apk add make && \
    apk add openssl && \
    apk add ca-certificates && \
    rm -rf /var/cac he/apk/*

RUN npm i -g npm

RUN mkdir -p /data/starter

ADD node_modules/ /data/starter/node_modules
ADD public/ /data/starter/public
ADD server/ /data/starter/server
ADD index.js package.json /data/starter/

WORKDIR /data/starter

RUN npm prune --production && npm rebuild

EXPOSE 4000

CMD ["node", "index.js"]
