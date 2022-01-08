#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
~/workspace/coffee-station/secret/.env \
~/workspace/coffee-station/secret/.env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output \
~/workspace/coffee-station/backend/runner/src/main/resources/firebase/firebase-notification-key.json \
~/workspace/coffee-station/backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg
