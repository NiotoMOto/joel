#!/bin/bash

SCRIPTDIR=$(dirname $0);
BASEDIR=$(realpath "$SCRIPTDIR/..");
DOCKERFILE="$BASEDIR/Dockerfile";
VERSION="not set";
CONTAINER="docker-dev.etf1.tf1.fr:5000/"; # Rajouter un nom de repo/image

# Message utility
function message() {
	if [[ ${#1} -gt 0 ]]; then
		echo -n $'\t✓ : ';
		echo $1;
		echo $'\n';
	fi
}

# Error/GC from now on on fail
function fail() {
	echo -n $'Error :\n\n\t';
	if [[ ${#1} -lt 1 ]]; then
		echo "Unknown error";
	else
		echo $1;
	fi
	echo -n $'\n\n';
	exit 1;
}


function run_docker() {
  # Checking version
  if ! jq --version > /dev/null; then
    fail "You need to install jq to run this script";
  fi
  VERSION=$(jq .version package.json | sed s/\"//g);
  if ! [[ $VERSION =~ ^[0-9\.]+$ ]]; then
    fail "$VERSION is an invalid semver";
  fi

  # Building
  message "Building container";
  docker build -t $CONTAINER:$VERSION $BASEDIR;
  if [[ $? -ne 0 ]] ; then
      fail "Could not build $CONTAINER:$VERSION";
  fi

  message "Successfully built image!";
}

function run_npm() {
  cd $BASEDIR;

  message "Installing dependencies";
  npm install;

  message "Building js/css bundle";
  NODE_ENV=production npm run build;
  if [[ $? -ne 0 ]] ; then
      fail "Could not build project!";
  fi

  message "Successfully initialised project!";
}

run_npm;
run_docker;

exit 0;
