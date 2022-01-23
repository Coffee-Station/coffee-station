#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_PROD" --output \
$GITHUB_WORKSPACE/secret/.env \
$GITHUB_WORKSPACE/secret/prod.env.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE_PROD" --output \
$GITHUB_WORKSPACE/backend/runner/src/main/resources/firebase/firebase-notification-key.json \
$GITHUB_WORKSPACE/backend/runner/src/main/resources/firebase/firebase-notification-key.json.gpg