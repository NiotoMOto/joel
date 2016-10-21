[![Build Status](http://drone.guillemoto.com/api/badges/NiotoMOto/joel/status.svg)](http://drone.guillemoto.com/NiotoMOto/joel)

Joel backoffice
==========

## Installation

### Prérequis

 - node >= 6.x
 - npm >= 3.x
 - Chrome / Firefox / IE >= 11

### Configuration

Lancer l'installation des dépendances :
```sh
$ npm i
```

Après avoir lancé les différentes API `core`, créer le fichier de configuration `index.js` ou `index.json` situé
dans `/config/` à partir de `example.js`.

_(Le port par défaut de l'application est le :4000)_

### Test

Installer en global `phantomjs` et `casperjs`.
```sh
$ npm i -g phantomjs casperjs
```

Et lancer les commandes :
```sh
$ gulp test:unit
$ gulp test:e2e
```

### Développement

```sh
$ gulp
ou
$ npm run gulp
```

### Production (sans docker)

```sh
$ NODE_ENV=production npm run build
$ NODE_ENV=production npm start
```

### Production (avec docker)

Après avoir fixé le numéro de version dans le `package.json`.

```sh
$ ./scripts/build.sh
$ ./scripts/push.sh
```
