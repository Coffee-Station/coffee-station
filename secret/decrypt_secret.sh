#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
$HOME/work/coffee-station/secret/.env \
$HOME/work/coffee-station/secret/.env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
$HOME/work/coffee-station/backend/runner/src/main/resources/firebase/firebase-notification-key.json \
$HOME/work/coffee-station/backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg
