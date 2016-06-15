#!/bin/bash

VERSION="not set";
CONTAINER="docker-dev.etf1.tf1.fr:5000/"; # Rajouter un repo/image

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

  docker pull $CONTAINER:$VERSION > /dev/null 2>&1
  if [[ $? -eq 0 ]] ; then
      fail "Registry already contains $CONTAINER:$VERSION, pulled it";
  fi

  message "Pushing container";
  docker push $CONTAINER:$VERSION;
  if [[ $? -ne 0 ]] ; then
      fail "Could not push $CONTAINER:$VERSION";
  fi

  message "Successfully pushed image!";
}

run_docker;

exit 0;
