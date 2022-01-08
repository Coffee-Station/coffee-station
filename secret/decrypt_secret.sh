#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
$HOME/workspace/coffee-station/secret/.env \
$HOME/workspace/coffee-station/secret/.env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
$HOME/workspace/coffee-station/backend/runner/src/main/resources/firebase/firebase-notification-key.json \
$HOME/workspace/coffee-station/backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg
