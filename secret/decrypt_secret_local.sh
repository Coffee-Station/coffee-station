#!/bin/sh
ABS_PATH=$(dirname $0 && pwd -P)
cd $ABS_PATH
cd ..
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_LOCAL" --output \
secret/.env \
secret/local.env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_LOCAL" --output \
backend/runner/src/main/resources/firebase/firebase-notification-key.json \
backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg
